import { useRouter } from "next/router";
import { tx } from "../src/rawDatas/i18n";
import Seo from "../src/components/global/seo";
import AboutMe from "../src/components/specific/about";
import Faq from "../src/components/specific/about/Faq";
import { breadcrumbLd, faqLd } from "../src/lib/seoSchema";
import { faqItems } from "../src/rawDatas/faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos de Paul Mèdédji ZANNOU",
  url: "https://paulzannou.com/about-me",
  mainEntity: {
    "@type": "Person",
    name: "Paul Mèdédji ZANNOU",
    alternateName: "Luap Dever",
    jobTitle: "Ingénieur logiciel full-stack",
    birthPlace: "Cotonou, Bénin",
    sameAs: [
      "https://github.com/luapdever",
      "https://linkedin.com/in/paul-zannou",
      "https://paulzannou.com",
    ],
  },
};

export default function AboutMePage() {
  const lang = useRouter().locale === "en" ? "en" : "fr";
  const en = lang === "en";
  const prefix = en ? "/en" : "";
  const schemas = [
    { ...jsonLd, name: en ? "About Paul Mèdédji ZANNOU" : jsonLd.name,
      url: `https://paulzannou.com${prefix}/about-me`, inLanguage: lang,
      mainEntity: { ...jsonLd.mainEntity, jobTitle: en ? "Full-Stack Software Engineer" : jsonLd.mainEntity.jobTitle } },
    breadcrumbLd([
      { name: en ? "Home" : "Accueil", path: en ? "/en" : "/" },
      { name: en ? "About" : "À propos", path: `${prefix}/about-me` },
    ]),
    faqLd(faqItems.map((item) => ({ q: tx(item.q, lang), a: tx(item.a, lang) }))),
  ];
  return (
    <>
      <Seo
        path="/about-me"
        title={`${en ? "About" : "À propos"} | Paul Mèdédji ZANNOU (Luap Dever)`}
        description={en ? "Paul Mèdédji ZANNOU (Luap Dever): from self-taught developer in Cotonou to full-stack software engineer. Background, principles and behind the scenes." : "La biographie de Paul Mèdédji ZANNOU (Luap Dever) : de développeur autodidacte à Cotonou à ingénieur logiciel full-stack. Parcours, principes et coulisses."}
        jsonLd={schemas}
      />
      <main>
        <AboutMe />
        <Faq />
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
