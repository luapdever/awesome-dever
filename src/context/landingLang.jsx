import { createContext, useContext, useEffect, useState } from "react";

/* Global FR/EN language for the public landing (homepage + Bio).
   Shares the same localStorage key as the OS ("os_lang") so the choice
   stays consistent when navigating between the site and PaulBrain OS.
   Preference wins; otherwise we follow the visitor's browser language
   (French → FR, anything else → EN) so a recruiter lands in their tongue. */
export const LandingLangContext = createContext({ lang: "fr", setLang: () => {} });

export function LandingLangProvider({ children }) {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("os_lang");
    if (saved === "fr" || saved === "en") { setLang(saved); document.documentElement.lang = saved; return; }
    // Pas de préférence enregistrée → détection navigateur (FR sinon EN).
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "fr";
    const detected = /^fr\b|^fr-/i.test(nav) ? "fr" : "en";
    setLang(detected);
    document.documentElement.lang = detected;
  }, []);

  const changeLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("os_lang", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <LandingLangContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LandingLangContext.Provider>
  );
}

export const useLandingLang = () => useContext(LandingLangContext);
