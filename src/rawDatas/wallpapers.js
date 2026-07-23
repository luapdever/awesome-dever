/* ============================================================
   Fonds d'écran du bureau (coding / desk, paysage 16:9).
   Fichiers dans public/media/wallpapers/ — un est choisi au hasard
   à chaque chargement. Ajoutez/retirez librement.
   ============================================================ */
export const wallpapers = [
  "/media/wallpapers/code-neon.webp",
  "/media/wallpapers/code-macbook.webp",
  "/media/wallpapers/code-closeup.webp",
  "/media/wallpapers/code-color.webp",
  "/media/wallpapers/devtools.webp",
  "/media/wallpapers/desk-mac.webp",
  "/media/wallpapers/laptop-desk.webp",
  "/media/wallpapers/workspace.webp",
  "/media/wallpapers/terminal.webp",
];

export const pickWallpaper = () =>
  wallpapers[Math.floor(Math.random() * wallpapers.length)];

export default wallpapers;
