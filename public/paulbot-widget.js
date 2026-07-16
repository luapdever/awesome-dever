/* ============================================================
   PaulBot — loader de widget embarquable (aucune dépendance).
   Injecte une <iframe> transparente vers /bot-embed (le vrai
   composant React BotWidget) et la redimensionne selon l'état
   du widget (fermé = launcher seul, ouvert = panneau, mobile =
   plein écran). À inclure sur n'importe quelle page :
     <script src="/paulbot-widget.js" defer></script>
   ============================================================ */
(function () {
  if (window.__paulbotWidgetLoaded) return;
  window.__paulbotWidgetLoaded = true;

  var f = document.createElement("iframe");
  f.src = "/bot-embed";
  f.title = "PaulBot";
  f.setAttribute("allow", "microphone; autoplay");
  f.setAttribute("scrolling", "no");
  f.setAttribute("allowtransparency", "true");
  f.setAttribute("aria-label", "PaulBot");

  var s = f.style;
  s.position = "fixed";
  s.right = "0";
  s.bottom = "0";
  s.left = "auto";
  s.top = "auto";
  s.width = "120px";
  s.height = "120px";
  s.border = "0";
  s.margin = "0";
  s.padding = "0";
  s.background = "transparent";
  s.colorScheme = "normal";
  s.zIndex = "2147483000";

  function setClosed() {
    s.left = "auto"; s.top = "auto"; s.right = "0"; s.bottom = "0";
    s.width = "130px"; s.height = "130px";
  }

  // Fermé : petit coin bas-droite (le launcher seul, le reste de la page reste
  // cliquable). Ouvert : plein viewport, si bien que le widget se dimensionne
  // selon le VRAI écran (panneau flottant sur desktop, plein écran sur mobile).
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.__paulbot !== true) return;
    if (d.open) {
      s.left = "0"; s.top = "0"; s.right = "0"; s.bottom = "0";
      s.width = "100%"; s.height = "100%";
    } else {
      setClosed();
    }
  });

  function mount() { if (!f.parentNode) document.body.appendChild(f); }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
