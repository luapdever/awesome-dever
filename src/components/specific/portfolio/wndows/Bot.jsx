import React from "react";
import BotWidget from "../../../global/BotWidget";
import { useLang } from "../lang";

/* L'app « PaulBot » de l'OS = EXACTEMENT le widget, en mode intégré.
   Aucune duplication : c'est le même composant, rendu pour remplir la fenêtre
   (pas de launcher ni de bulle). La langue suit le toggle FR/EN de l'OS. */
function Bot() {
  const { lang } = useLang();
  return <BotWidget embedded lang={lang} />;
}

export default Bot;
