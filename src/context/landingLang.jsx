import { createContext, useContext, useEffect, useState } from "react";

/* Global FR/EN language for the public landing (homepage + Bio).
   Shares the same localStorage key as the OS ("os_lang") so the choice
   stays consistent when navigating between the site and PaulBrain OS.
   French-first: the site defaults to FR. */
export const LandingLangContext = createContext({ lang: "fr", setLang: () => {} });

export function LandingLangProvider({ children }) {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("os_lang");
    if (saved === "fr" || saved === "en") setLang(saved);
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
