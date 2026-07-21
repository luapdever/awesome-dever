/* Petit wrapper GA4 partagé — envoie un événement seulement si gtag est chargé
   (respecte le Consent Mode : si l'analytics est refusé, gtag ne mesure rien).
   Aucune donnée personnelle : uniquement des noms d'événements + libellés courts.
   Les « money events » de conversion passent tous par ici (SSOT). */
export function track(event, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  } catch {
    /* jamais bloquer l'UI pour de l'analytics */
  }
}
