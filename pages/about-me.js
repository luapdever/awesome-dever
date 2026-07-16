import Seo from "../src/components/global/seo";
import AboutMe from "../src/components/specific/about";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos de Paul Mèdédji ZANNOU",
  url: "https://luap-dever.netlify.app/about-me",
  mainEntity: {
    "@type": "Person",
    name: "Paul Mèdédji ZANNOU",
    alternateName: "Luap Dever",
    jobTitle: "Ingénieur logiciel full-stack",
    birthPlace: "Cotonou, Bénin",
    sameAs: [
      "https://github.com/luapdever",
      "https://linkedin.com/in/paul-zannou-b253a2205",
      "https://luap-dever.netlify.app",
    ],
  },
};

export default function AboutMePage() {
  return (
    <>
      <Seo
        path="/about-me"
        title="À propos — Paul Mèdédji ZANNOU (Luap Dever)"
        description="La biographie de Paul Mèdédji ZANNOU (Luap Dever) : de développeur autodidacte à Cotonou à ingénieur logiciel full-stack. Parcours, principes et coulisses."
        jsonLd={jsonLd}
      />
      <main>
        <AboutMe />
      </main>
    </>
  );
}
