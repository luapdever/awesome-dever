import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";

/* Langue des pages publiques. La source de vérité est l'URL (`/` = fr,
   `/en/...` = en) : c'est la seule façon pour un moteur d'indexer les deux
   versions. Le contexte n'a plus d'état propre, il lit le routeur — l'API
   `{ lang, setLang }` reste identique pour les 17 composants qui l'utilisent.

   Pont avec PaulBrain OS : l'OS lit et écrit `os_lang` dans localStorage. On le
   tient synchronisé — la locale de l'URL l'alimente à l'arrivée, le sélecteur
   l'écrit avant de naviguer. Le cookie NEXT_LOCALE fait le chemin inverse :
   Next s'en sert pour renvoyer vers la bonne langue un visiteur qui revient
   sur `/` après avoir choisi l'anglais dans l'OS. */

export const LandingLangContext = createContext({ lang: "fr", setLang: () => {} });

const LOCALES = ["fr", "en"];
const norm = (l) => (LOCALES.includes(l) ? l : "fr");

/** Mémorise la préférence pour l'OS (localStorage) et pour Next (cookie). */
export function rememberLang(l) {
  if (typeof window === "undefined") return;
  const lang = norm(l);
  try { localStorage.setItem("os_lang", lang); } catch {}
  document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000;samesite=lax`;
}

export function LandingLangProvider({ children }) {
  const router = useRouter();
  const lang = norm(router.locale);

  // L'URL fait foi : on aligne l'OS et le cookie sur elle, jamais l'inverse.
  useEffect(() => {
    document.documentElement.lang = lang;
    rememberLang(lang);
  }, [lang]);

  /* Changer de langue = naviguer. `scroll: false` conserve la position de
     lecture, sans quoi chaque bascule renverrait en haut de page. */
  const setLang = (l) => {
    const next = norm(l);
    if (next === lang) return;
    rememberLang(next);
    router.push({ pathname: router.pathname, query: router.query }, undefined, {
      locale: next,
      scroll: false,
    });
  };

  return (
    <LandingLangContext.Provider value={{ lang, setLang }}>
      {children}
    </LandingLangContext.Provider>
  );
}

export const useLandingLang = () => useContext(LandingLangContext);
