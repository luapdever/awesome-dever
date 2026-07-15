import { Injectable } from "@nestjs/common";
import type { Response } from "express";
import { buildSystemPrompt } from "./paul.context";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
export interface ChatBody {
  messages?: ChatMessage[];
  lang?: "fr" | "en";
}

const BASE_URL = (process.env.LLM_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/+$/, "");
const MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";
const API_KEY = process.env.LLM_API_KEY || "";
const MAX_MESSAGES = 12; // mémoire de conversation courte, fenêtre bornée

// Message montré au visiteur en cas de souci — jamais de détail technique.
const OFFLINE = {
  fr: "Je suis momentanément indisponible. Réessaie dans un instant, ou écris directement à Paul : pzannou511@gmail.com.",
  en: "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com.",
};

@Injectable()
export class PaulbotService {
  /** Stream la réponse du modèle (OpenAI-compatible) en texte brut. */
  async stream(body: ChatBody, res: Response): Promise<void> {
    const lang: "fr" | "en" = body?.lang === "en" ? "en" : "fr";
    const clean = (Array.isArray(body?.messages) ? body!.messages! : [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");

    if (!API_KEY) {
      console.warn("[PaulBot] LLM_API_KEY manquante — configure la clé du modèle.");
      res.end(OFFLINE[lang]);
      return;
    }

    const payload = {
      model: MODEL,
      stream: true,
      temperature: 0.4,
      max_tokens: 800,
      messages: [{ role: "system", content: buildSystemPrompt(lang) }, ...clean],
    };

    try {
      const upstream = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok || !upstream.body) {
        const detail = await upstream.text().catch(() => "");
        console.error("[PaulBot] modèle KO:", upstream.status, detail.slice(0, 500));
        res.end(OFFLINE[lang]);
        return;
      }

      const reader = (upstream.body as any).getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        buffer = parts.pop() || "";
        for (const line of parts) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") {
            res.end();
            return;
          }
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) res.write(delta);
          } catch {
            /* ligne partielle : complétée au prochain chunk */
          }
        }
      }
      res.end();
    } catch (err) {
      console.error("[PaulBot] appel LLM échoué:", err);
      res.end(OFFLINE[lang]);
    }
  }
}
