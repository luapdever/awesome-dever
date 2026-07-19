/* ALTCHA — captcha open-source (proof-of-work), résolu côté client.
   On récupère un défi signé par le backend, on résout le PoW (coûteux pour un
   bot, invisible pour un humain), et on renvoie la preuve au backend qui la
   vérifie via HMAC. Aucun service tiers. */
import { solveChallenge } from "altcha-lib";

const CHAT = process.env.NEXT_PUBLIC_CHAT_URL || "/api/chat";
export const ALTCHA_URL = CHAT.replace(/\/chat(\/?)$/, "/altcha$1");
export const CONTACT_URL = CHAT.replace(/\/chat(\/?)$/, "/contact$1");
export const ORDER_URL = CHAT.replace(/\/chat(\/?)$/, "/order$1");

const b64 = (obj) => {
  const s = JSON.stringify(obj);
  return typeof btoa !== "undefined" ? btoa(s) : Buffer.from(s).toString("base64");
};

// Récupère + résout un défi ALTCHA → renvoie la preuve encodée (base64).
export async function solveAltcha(url = ALTCHA_URL) {
  const ch = await fetch(url, { method: "GET" }).then((r) => r.json());
  const { promise } = solveChallenge(ch.challenge, ch.salt, ch.algorithm, ch.maxnumber);
  const sol = await promise;
  if (!sol) throw new Error("altcha_unsolved");
  return b64({
    algorithm: ch.algorithm,
    challenge: ch.challenge,
    number: sol.number,
    salt: ch.salt,
    signature: ch.signature,
  });
}

// POST commun (résout le captcha ALTCHA puis envoie). Renvoie { ok } ou lève.
async function postGuarded(url, payload) {
  const altcha = await solveAltcha();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, altcha }),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const err = new Error(detail.error || `http_${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json().catch(() => ({ ok: true }));
}

// Résout le captcha puis poste le contact.
export function submitContact(payload, url = CONTACT_URL) {
  return postGuarded(url, payload);
}

// Résout le captcha puis poste une commande du mini-shop.
export function submitOrder(payload, url = ORDER_URL) {
  return postGuarded(url, payload);
}
