/* ============================================================
   PaulBot — appel streaming réutilisable (commande terminal `ask`, …).
   Réutilise l'IDENTITÉ et la CONVERSATION *partagées* du widget
   (mêmes clés localStorage) : une question posée au terminal
   poursuit la même conversation et l'identité déjà saisie ailleurs.
   Aucune duplication de logique réseau côté composant.
   ============================================================ */
import { extractActions } from "./botActions";
import { solveAltcha } from "./altcha";

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";

// Même helper de stockage partagé que BotWidget (localStorage, avec repli
// migratoire depuis sessionStorage) — partagé entre onglets/iframes.
const shared = {
  get(key) {
    try {
      const l = localStorage.getItem(key);
      if (l !== null) return l;
      const s = sessionStorage.getItem(key);
      if (s !== null) { localStorage.setItem(key, s); sessionStorage.removeItem(key); }
      return s;
    } catch { return null; }
  },
  set(key, val) { try { localStorage.setItem(key, val); sessionStorage.removeItem(key); } catch {} },
  remove(key) { try { localStorage.removeItem(key); sessionStorage.removeItem(key); } catch {} },
};

const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "cid-" + Math.random().toString(36).slice(2) + Date.now().toString(36);

export function getContact() {
  try { const s = shared.get("paulbot_contact"); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function setContact(c) { try { shared.set("paulbot_contact", JSON.stringify(c)); } catch {} }
export function clearContact() { shared.remove("paulbot_contact"); }

function getCid() {
  let cid = shared.get("paulbot_cid");
  if (!cid) { cid = newId(); shared.set("paulbot_cid", cid); }
  return cid;
}
function getMessages() {
  try { const a = JSON.parse(shared.get("paulbot_messages") || "[]"); return Array.isArray(a) ? a : []; }
  catch { return []; }
}
function saveMessages(msgs) {
  try { shared.set("paulbot_messages", JSON.stringify(msgs.slice(-40))); } catch {}
}

// Nettoie le flux pour un affichage terminal : retire les marqueurs [[go:]]
// (navigation, non pertinents en shell) et les **gras** Markdown.
function cleanForTerminal(raw) {
  return extractActions(raw || "").clean.replace(/\*\*(.+?)\*\*/g, "$1");
}

/* Pose une question au bot, en streaming.
   - onToken(partialCleanText) est appelé à chaque paquet reçu.
   - Renvoie le texte final nettoyé.
   Réutilise le contact + le conversationId + l'historique partagés, et
   ré-enregistre la conversation (le widget se met à jour entre onglets). */
export async function askBotStream({ question, lang = "fr", onToken, signal }) {
  const q = (question || "").trim();
  const contact = getContact();
  const cid = getCid();
  const prior = getMessages()
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .map((m) => ({ role: m.role, content: m.content }))
    .slice(-20);
  const context = [...prior, { role: "user", content: q }];

  // Anti-bot : ALTCHA (proof-of-work) exigé une fois par conversation. On partage
  // l'état avec le widget via le même conversationId (flag paulbot_altcha_cid) →
  // on ne re-résout pas un défi si la conversation est déjà vérifiée.
  let altcha;
  if (shared.get("paulbot_altcha_cid") !== cid) {
    try { altcha = await solveAltcha(); } catch { altcha = undefined; }
  }

  const url = (typeof window !== "undefined" && window.__CHAT_URL) || CHAT_URL;
  const H = { "Content-Type": "application/json" };
  const reqBody = (proof) => JSON.stringify({ messages: context, lang, conversationId: cid, contact, ...(proof ? { altcha: proof } : {}) });
  let res = await fetch(url, { method: "POST", headers: H, body: reqBody(altcha), signal });
  // 403 = vérification anti-bot perdue côté serveur (ex. backend redémarré) →
  // on invalide le cache, ré-résout un ALTCHA frais et retente UNE fois.
  if (res.status === 403) {
    try { shared.set("paulbot_altcha_cid", ""); } catch {}
    try { altcha = await solveAltcha(); } catch { altcha = undefined; }
    if (altcha) res = await fetch(url, { method: "POST", headers: H, body: reqBody(altcha), signal });
  }
  if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
  if (altcha) shared.set("paulbot_altcha_cid", cid); // preuve envoyée → conversation vérifiée

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let acc = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += dec.decode(value, { stream: true });
    if (onToken) onToken(cleanForTerminal(acc));
  }
  const finalText = cleanForTerminal(acc);

  const all = getMessages();
  all.push({ role: "user", content: q, at: Date.now() });
  all.push({ role: "assistant", content: finalText, at: Date.now() });
  saveMessages(all);

  return finalText;
}
