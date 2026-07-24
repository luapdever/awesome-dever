import { L } from "./i18n";

/* Source UNIQUE des métriques d'impact (chiffres réels, vérifiables).
   Réutilisée par la home (collaborations) ET l'OS (cartes projet) → une seule
   saisie, plus de dérive entre home.js et performances.js. Ajoute une clé ici,
   puis référence-la des deux côtés. N'INVENTE PAS de chiffre : n'ajoute que du réel. */
export const IMPACT = {
  emilia: L("2,000+ real-time users", "2 000+ utilisateurs en temps réel"),
  mtnAudience: L("MTN audience: 1M+ subscribers", "Audience MTN : 1M+ abonnés"),
  mtnSSO: L("MTN SSO: 1–2M subscribers", "SSO MTN : 1–2M abonnés"),
  mtnRouter: L("1M+ MTN subscribers · plan tracking", "1M+ abonnés MTN · suivi de forfait"),
};

export default IMPACT;
