/* ============================================================
   Fonds d'écran du bureau (coding / desk, paysage 16:9).
   Fichiers dans public/temp/wallpapers/ — un est choisi au hasard
   à chaque chargement. Ajoutez/retirez librement.
   ============================================================ */
export const wallpapers = [
  "/temp/wallpapers/code-neon.jpg",
  "/temp/wallpapers/code-macbook.jpg",
  "/temp/wallpapers/code-closeup.jpg",
  "/temp/wallpapers/code-color.jpg",
  "/temp/wallpapers/devtools.jpg",
  "/temp/wallpapers/desk-mac.jpg",
  "/temp/wallpapers/laptop-desk.jpg",
  "/temp/wallpapers/workspace.jpg",
  "/temp/wallpapers/terminal.jpg",
];

export const pickWallpaper = () =>
  wallpapers[Math.floor(Math.random() * wallpapers.length)];

export default wallpapers;
