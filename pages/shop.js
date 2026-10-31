import Seo from "../src/components/global/seo";
import MiniShop from "../src/components/global/MiniShop";
import { useLandingLang } from "../src/context/landingLang";
import { breadcrumbLd } from "../src/lib/seoSchema";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Développement web, mobile & IA",
  provider: {
    "@type": "Person",
    name: "Paul Mèdédji ZANNOU",
    alternateName: "Luap Dever",
    url: "https://paulzannou.com",
  },
  areaServed: "Worldwide",
  url: "https://paulzannou.com/shop",
};

export default function ShopPage() {
  const { lang } = useLandingLang();
  const en = lang === "en";
  const prefix = en ? "/en" : "";
  return (
    <>
      <Seo
        path="/shop"
        title={en ? "Services | Start a project | Luap Dever" : "Services | Commander un projet | Luap Dever"}
        description={en ? "Discuss a custom website, Flutter mobile app, AI assistant, WooCommerce shop or BI dashboard with Paul Zannou." : "Commandez un site web sur mesure, une app mobile Flutter, un assistant IA, une boutique WooCommerce ou un back-office BI. Choisissez un service, répondez à quelques questions, et Paul revient vers vous."}
        jsonLd={[{ ...jsonLd, serviceType: en ? "Web, mobile and AI development" : jsonLd.serviceType, url: `https://paulzannou.com${prefix}/shop` }, breadcrumbLd([{ name: en ? "Home" : "Accueil", path: en ? "/en" : "/" }, { name: en ? "Services" : "Services", path: `${prefix}/shop` }])]}
      />
      <main>
        <MiniShop lang={lang} />
      </main>
    </>
  );
}

/* Sans getStaticProps, Next applique l'optimisation statique automatique et
   produit UN SEUL HTML pour toutes les locales — la version anglaise ne serait
   donc toujours pas indexable. Ce bloc force une génération par locale. */
export async function getStaticProps() {
  return { props: {} };
}
