import { createContext, useContext, useEffect, useState } from "react";

/* First-visit experience chooser.
   - Shows a mandatory (non-dismissible) chooser once per browsing session
     (sessionStorage), NOT on every reload.
   - Once a type is picked, no more auto-popup for the session.
   - Reopenable anytime from a menu via openChooser() (dismissible then). */
export const ExperienceContext = createContext({
  open: false,
  mandatory: false,
  openChooser: () => {},
  remember: () => {},
  dismiss: () => {},
});

export function ExperienceProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mandatory, setMandatory] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathname = window.location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    // Pas de sélecteur automatique sur les pages de lecture et de projet.
    if (pathname.startsWith("/paulfolio")) return;
    // Ne pas déranger sur TOUT le blog : l'index (/blog) ET les articles (/blog/<slug>).
    if (pathname.startsWith("/blog") || pathname.startsWith("/projects")) return;
    if (sessionStorage.getItem("dever_experience")) return;
    const id = setTimeout(() => {
      setMandatory(true);
      setOpen(true);
    }, 2400);
    return () => clearTimeout(id);
  }, []);

  const openChooser = () => {
    setMandatory(false);
    setOpen(true);
  };
  const remember = (type) => {
    if (typeof window !== "undefined") sessionStorage.setItem("dever_experience", type);
  };
  const dismiss = () => setOpen(false);

  return (
    <ExperienceContext.Provider value={{ open, mandatory, openChooser, remember, dismiss }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);
