import React from "react";
import { useExperience } from "../../context/experience";
import { useLandingLang } from "../../context/landingLang";

const ICON = "/icons/ph/sparkle-fill__2a1a00.svg";

/* Sticky round FAB on the left edge — reopens the experience chooser.
   The modal's close animation "drops" into this button (see ExperienceModal). */
function ExperienceButton() {
  const { openChooser } = useExperience();
  const { lang } = useLandingLang();
  const label = lang === "fr" ? "Changer d'expérience" : "Change experience";
  // Tooltip explicite : dit ce que fait le bouton avant le clic.
  const hint = lang === "fr"
    ? "Changer d'expérience — version classique ou PaulBrain OS"
    : "Change experience — classic version or PaulBrain OS";
  return (
    <button id="expSticky" className="expSticky" onClick={openChooser} aria-label={hint} title={hint}>
      <img src={ICON} alt="" width={26} height={26} />
    </button>
  );
}

export default ExperienceButton;
