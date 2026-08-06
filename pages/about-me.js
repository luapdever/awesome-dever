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

/* Le schéma FAQ est rendu côté SERVEUR, donc en français (cf. langue par défaut
   du contexte) : c'est cette version que Google indexe. */
const schemas = [
  jsonLd,
  breadcrumbLd([
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about-me" },
  ]),
  faqLd(faqItems.map((i) => ({ q: i.q.fr, a: i.a.fr }))),
];

export default function AboutMePage() {
  return (
    <>
      <Seo
        path="/about-me"
        title="À propos — Paul Mèdédji ZANNOU (Luap Dever)"
        description="La biographie de Paul Mèdédji ZANNOU (Luap Dever) : de développeur autodidacte à Cotonou à ingénieur logiciel full-stack. Parcours, principes et coulisses."
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
