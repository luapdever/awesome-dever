import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/specific/topProgress.module.css";

/* ============================================================
   TopProgress — fine barre de progression en haut de page.
   Se déclenche sur TOUTE navigation client (lien Next OU action
   proposée par l'IA → router.push) pour signaler l'attente et
   éviter qu'un clic un peu lent passe pour un bug. Zéro dépendance.

   • délai d'apparition (120 ms) : les navigations instantanées
     n'affichent RIEN (pas de flash), seules celles qui traînent
     déclenchent la barre.
   • « trickle » : la barre avance par paliers décroissants et
     plafonne à ~90 % tant que la page n'est pas prête, puis file
     à 100 % et s'efface.
   ============================================================ */
export default function TopProgress() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const startDelay = useRef(null);
  const trickle = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    const clearAll = () => {
      [startDelay, trickle, hideTimer].forEach((r) => {
        if (r.current) { clearTimeout(r.current); clearInterval(r.current); r.current = null; }
      });
    };

    const begin = () => {
      clearAll();
      startDelay.current = setTimeout(() => {
        startDelay.current = null;
        setVisible(true);
        setWidth(8);
        trickle.current = setInterval(() => {
          setWidth((w) => (w >= 90 ? w : w + Math.max(0.4, (90 - w) * 0.1)));
        }, 220);
      }, 120);
    };

    const end = () => {
      // Navigation terminée avant l'apparition → on annule tout, aucun flash.
      if (startDelay.current) { clearAll(); return; }
      clearAll();
      setWidth(100);
      hideTimer.current = setTimeout(() => { setVisible(false); setWidth(0); }, 260);
    };

    router.events.on("routeChangeStart", begin);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", begin);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
      clearAll();
    };
  }, [router.events]);

  if (!visible) return null;
  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ width: `${width}%` }} />
    </div>
  );
}
