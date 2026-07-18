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
    // Don't hijack the OS at /paulfolio.
    if (window.location.pathname.startsWith("/paulfolio")) return;
    // Ne pas déranger la lecture d'un article de blog (/blog/<slug>).
    if (window.location.pathname.startsWith("/blog/")) return;
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
