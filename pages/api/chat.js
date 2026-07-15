/* ============================================================
   PROXY SSR — Next.js relaie vers le backend NestJS dédié.
   - Mode SSR / même origine : le front appelle /api/chat, Next
     transfère (stream) vers le Nest → pas de CORS, backend caché.
   - Mode SPA : le front appelle Nest en direct (voir Bot.jsx +
     NEXT_PUBLIC_CHAT_URL) et ce proxy n'est pas utilisé.
   La clé LLM ne vit QUE dans le backend Nest, jamais ici.
   ============================================================ */
const TARGET = process.env.CHAT_API_URL || "http://api:4000/paulbot/chat";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const upstream = await fetch(TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    res.writeHead(upstream.status, {
      "Content-Type": upstream.headers.get("content-type") || "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    });

    if (!upstream.body) { res.end(); return; }
    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (err) {
    console.error("[proxy /api/chat] backend injoignable:", err?.message || err);
    const lang = req.body && req.body.lang === "en" ? "en" : "fr";
    res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(
      lang === "fr"
        ? "Je suis momentanément indisponible. Réessaie dans un instant, ou écris directement à Paul : pzannou511@gmail.com."
        : "I'm momentarily unavailable. Please try again shortly, or reach Paul directly at pzannou511@gmail.com."
    );
  }
}
