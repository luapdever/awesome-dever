/* ============================================================
   PROXY SSR — export PDF de la conversation.
   Le front poste {messages, contact, conversationId} ; Next relaie
   vers le backend Nest qui renvoie le PDF (même rendu que l'email).
   ============================================================ */
const TARGET = (process.env.CHAT_API_URL || "http://api:4000/paulbot/chat").replace(/\/chat(\/?)$/, "/transcript$1");

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

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "pdf" });
      return;
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="paulbot-conversation.pdf"');
    res.setHeader("Cache-Control", "no-store");
    res.send(buf);
  } catch (err) {
    console.error("[proxy /api/transcript] backend injoignable:", err?.message || err);
    res.status(502).json({ error: "pdf" });
  }
}
