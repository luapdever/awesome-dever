import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { localizedPath } from "../lib/localeUrl.mjs";
import { captureText, recomposeText } from "../lib/languageTransition";

export const LandingLangContext = createContext({ lang: "fr", pendingLang: null, setLang: () => {}, languageHref: () => "/" });
const norm = (locale) => locale === "en" ? "en" : "fr";

export function rememberLang(locale) {
  if (typeof window === "undefined") return;
  const lang = norm(locale);
  try { localStorage.setItem("os_lang", lang); } catch {}
  document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000;samesite=lax`;
}

export function LandingLangProvider({ children }) {
  const router = useRouter();
  const lang = norm(router.locale);
  const [pendingLang, setPendingLang] = useState(null);
  // Les pages statiques ne connaissent ni la query ni le hash pendant le rendu serveur.
  const [currentPath, setCurrentPath] = useState(() => router.asPath.split(/[?#]/)[0]);
  const busy = useRef(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    rememberLang(lang);
  }, [lang]);

  useEffect(() => {
    const syncPath = () => setCurrentPath(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    syncPath();
    window.addEventListener("hashchange", syncPath);
    return () => window.removeEventListener("hashchange", syncPath);
  }, [router.asPath, lang]);

  const languageHref = (next) => localizedPath(currentPath, norm(next));
  const setLang = async (locale) => {
    const next = norm(locale);
    if (next === lang || busy.current) return;
    busy.current = true;
    setPendingLang(next);
    const before = captureText();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.languageTransition = "true";
    try {
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const changed = await router.push(localizedPath(current, next), undefined, { locale: false, scroll: false });
      if (changed) {
        setCurrentPath(localizedPath(current, next));
        rememberLang(next);
        await recomposeText(before, next === "en" ? 1 : -1, reduced);
      }
    } catch (error) {
      if (!error.cancelled) throw error;
    } finally {
      delete document.documentElement.dataset.languageTransition;
      busy.current = false;
      setPendingLang(null);
    }
  };

  return (
    <LandingLangContext.Provider value={{ lang, pendingLang, setLang, languageHref }}>
      {children}
      <span className="sr-only" role="status" aria-live="polite">
        {pendingLang ? "" : lang === "fr" ? "Version française" : "English version"}
      </span>
    </LandingLangContext.Provider>
  );
}

export const useLandingLang = () => useContext(LandingLangContext);
