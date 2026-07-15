import { Suspense } from "react";
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
            {!hideChrome && <ExperienceModal />}
          </ExperienceProvider>
        </LandingLangProvider>
      </Suspense>
    </div>
  );
}

export default MyApp;
