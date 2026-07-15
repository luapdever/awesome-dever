// TEMP — endpoint de test E2E navigation (à supprimer). Renvoie une réponse
// canned contenant un marqueur [[go:...]] en streaming, pour valider la chaîne
// widget → stream → extractActions → runNavAction sans backend LLM.
export default async function handler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
  const parts = ["Bien sûr — ", "je t'emmène ", "voir ses collaborations ! ", "[[go:collaborations]]"];
  for (const p of parts) {
    res.write(p);
    await new Promise((r) => setTimeout(r, 60));
  }
  res.end();
}
