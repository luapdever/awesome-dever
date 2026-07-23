import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from "next/font/google";
import TheFooter from "../src/components/global/footer";
import NavBar from "../src/components/global/nav";
import "../styles/keyframes.css";
import "../styles/globals.css";
import Cursor from "../src/components/global/cursor";
import { LandingLangProvider } from "../src/context/landingLang";
import { ExperienceProvider } from "../src/context/experience";
import ExperienceModal from "../src/components/specific/home/ExperienceModal";
import ExperienceButton from "../src/components/global/ExperienceButton";
import BotWidget from "../src/components/global/BotWidget";
import CookieConsent from "../src/components/global/CookieConsent";
import SmartNudge from "../src/components/global/SmartNudge";
import TopProgress from "../src/components/global/TopProgress";
import ErrorBoundary from "../src/components/global/ErrorBoundary";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

// Repli affiché si une PAGE crashe au rendu (ErrorBoundary). Le lien est un <a>
// EN DUR volontairement : après un crash, l'ErrorBoundary reste en état d'erreur ;
// une navigation client (<Link>) rejouerait le repli sans jamais se réinitialiser.
// Seul un rechargement complet du navigateur remet tout à zéro — d'où le <a> et la
// dérogation à la règle no-html-link-for-pages.
const pageErrorFallback = (
  <main style={{ padding: "80px 20px", textAlign: "center", color: "#eae6ff" }}>
    <p>
      Un souci d&apos;affichage est survenu.{" "}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" style={{ color: "#ffa500" }}>Recharger l&apos;accueil</a>.
    </p>
  </main>
);

function MyApp({ Component, pageProps }) {
  // Pages can opt out of the global chrome (nav + footer) — e.g. the OS
  // at /paulfolio runs full-screen without header/footer.
  const hideChrome = Component.hideChrome === true;

  // Mode « embed » : la page est chargée DANS une iframe (l'OS /paulfolio embarque
  // le blog). On n'affiche alors QUE le contenu — pas de nav, footer, bannière
  // cookies ni widget bot. Détecté via window.self !== window.top ; comme
  // X-Frame-Options=SAMEORIGIN, seule NOTRE app peut framer → sûr.
  const [isEmbed, setIsEmbed] = useState(false);
  useEffect(() => {
    try { setIsEmbed(window.self !== window.top); } catch { setIsEmbed(true); }
  }, []);
  const bare = hideChrome || isEmbed;

  // SPA page views : Next navigue côté client (pas de rechargement), donc
  // gtag n'envoie qu'UN page_view au 1er chargement. On en émet un à chaque
  // changement de route → GA4 voit /book, /paulfolio, /about-me, etc.
  const router = useRouter();
  useEffect(() => {
    const onRouteChange = (url) => {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.origin + url,
        page_title: document.title,
      });
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [router.events]);

  return (
    <div
      className={montserrat.variable}
      style={{ fontFamily: "var(--font-sans), 'Montserrat', 'Segoe UI', system-ui, sans-serif" }}
    >
      <Suspense fallback={<p>Loading</p>}>
        <LandingLangProvider>
          <ExperienceProvider>
            {!isEmbed && <Cursor />}
            {!isEmbed && <TopProgress />}
            {!bare && <NavBar />}
            {/* Contenu principal isolé : un crash de page affiche un repli, pas un écran blanc. */}
            <ErrorBoundary
              name="page"
              fallback={pageErrorFallback}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
            {!isEmbed && <ToastContainer theme="dark" />}
            {!bare && <TheFooter />}
            {!bare && <ExperienceButton />}
            {/* Widget monté en permanence (même sur l'OS /paulfolio) : il ne se
                démonte jamais lors d'une navigation client, donc il reste ouvert
                si le visiteur l'avait ouvert. Chaque widget est isolé → son crash
                éventuel ne tue pas la page (fallback silencieux). */}
            {!isEmbed && <ErrorBoundary name="bot"><BotWidget /></ErrorBoundary>}
            {!isEmbed && <ErrorBoundary name="consent"><CookieConsent /></ErrorBoundary>}
            {!isEmbed && <ErrorBoundary name="nudge"><SmartNudge /></ErrorBoundary>}
            {!bare && <ErrorBoundary name="expmodal"><ExperienceModal /></ErrorBoundary>}
          </ExperienceProvider>
        </LandingLangProvider>
      </Suspense>
    </div>
  );
}

export default MyApp;
