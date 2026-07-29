/* Proxy SSR du one-pager PDF : relaie {role, analysis, lang} vers Nest, qui
   met en page l'analyse déjà produite par le mode pitch (aucun appel LLM). */
const TARGET = (process.env.CHAT_API_URL || "http://api:4000/paulbot/chat").replace(/\/chat(\/?)$/, "/onepager$1");

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
    res.setHeader("Content-Disposition", 'attachment; filename="paul-zannou-adequation.pdf"');
    res.setHeader("Cache-Control", "no-store");
    res.send(buf);
  } catch (err) {
    console.error("[proxy /api/onepager] backend injoignable:", err?.message || err);
    res.status(502).json({ error: "pdf" });
  }
}
