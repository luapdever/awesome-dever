/* ============================================================
   Calcul automatique de l'expérience depuis le 1er septembre 2021.
   ============================================================ */
export const XP_START = "2021-09-01";

export function yearsOfExperience(from = XP_START) {
  const start = new Date(from);
  const now = new Date();
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000);
  return Math.max(1, Math.round(years));
}
