/* Proxy SSR — défi captcha ALTCHA depuis le backend Nest. */
const TARGET = (process.env.CHAT_API_URL || "http://api:4000/paulbot/chat").replace(/\/chat(\/?)$/, "/altcha$1");

export default async function handler(req, res) {
  try {
    const up = await fetch(TARGET);
    const data = await up.text();
    res.status(up.status).setHeader("Content-Type", "application/json").setHeader("Cache-Control", "no-store").send(data);
  } catch (err) {
    console.error("[proxy /api/altcha] backend injoignable:", err?.message || err);
    res.status(502).json({ error: "altcha" });
  }
}
