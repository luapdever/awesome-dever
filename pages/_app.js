import { Suspense, useEffect } from "react";
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

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

function MyApp({ Component, pageProps }) {
  // Pages can opt out of the global chrome (nav + footer) — e.g. the OS
  // at /paulfolio runs full-screen without header/footer.
  const hideChrome = Component.hideChrome === true;

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
            <Cursor />
            {!hideChrome && <NavBar />}
            <Component {...pageProps} />
            <ToastContainer theme="dark" />
            {!hideChrome && <TheFooter />}
            {!hideChrome && <ExperienceButton />}
            {/* Widget monté en permanence (même sur l'OS /paulfolio) : il ne se
                démonte jamais lors d'une navigation client, donc il reste ouvert
                si le visiteur l'avait ouvert. */}
            <BotWidget />
            <CookieConsent />
            <SmartNudge />
            {!hideChrome && <ExperienceModal />}
          </ExperienceProvider>
        </LandingLangProvider>
      </Suspense>
    </div>
  );
}

export default MyApp;
