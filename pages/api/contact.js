/* Proxy SSR — soumission du formulaire de contact vers le backend Nest
   (qui vérifie le captcha ALTCHA + rate-limit + envoie l'email). On transfère
   l'IP réelle pour que la limitation par IP fonctionne. */
const TARGET = (process.env.CHAT_API_URL || "http://api:4000/paulbot/chat").replace(/\/chat(\/?)$/, "/contact$1");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  try {
    const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").toString();
    const up = await fetch(TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(req.body || {}),
    });
    const data = await up.text();
    res.status(up.status).setHeader("Content-Type", "application/json").send(data);
  } catch (err) {
    console.error("[proxy /api/contact] backend injoignable:", err?.message || err);
    res.status(502).json({ error: "contact" });
  }
}
