import Seo from "../src/components/global/seo";
import MiniShop from "../src/components/global/MiniShop";
import { useLandingLang } from "../src/context/landingLang";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Développement web, mobile & IA",
  provider: {
    "@type": "Person",
    name: "Paul Mèdédji ZANNOU",
    alternateName: "Luap Dever",
    url: "https://luap-dever.netlify.app",
  },
  areaServed: "Worldwide",
  url: "https://luap-dever.netlify.app/shop",
};

export default function ShopPage() {
  const { lang } = useLandingLang();
  return (
    <>
      <Seo
        path="/shop"
        title="Services — Commander un projet | Luap Dever"
        description="Commandez un site web sur mesure, une app mobile Flutter, un assistant IA, une boutique WooCommerce ou un back-office BI. Choisissez un service, répondez à quelques questions, et Paul revient vers vous."
        jsonLd={jsonLd}
      />
      <main>
        <MiniShop lang={lang} />
      </main>
    </>
  );
}
