import Seo from "../src/components/global/seo";
import HomePage from "../src/components/specific/home";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Mèdédji ZANNOU",
  alternateName: "Luap Dever",
  jobTitle: "Ingénieur logiciel full-stack",
  url: "https://luap-dever.me",
  image: "https://luap-dever.me/luap.png",
  address: { "@type": "PostalAddress", addressLocality: "Cotonou", addressCountry: "BJ" },
  description:
    "Ingénieur logiciel full-stack : web, mobile, temps réel et DevOps. Backend distribué, interfaces réactives, paiements, streaming vidéo et écosystèmes WordPress d'entreprise.",
  knowsAbout: ["JavaScript", "TypeScript", "Vue.js", "NestJS", "Node.js", "Flutter", "PHP", "Docker", "WordPress"],
  sameAs: [
    "https://github.com/luapdever",
    "https://linkedin.com/in/paul-zannou-b253a2205",
    "https://facebook.com/paulsmith.zannou",
    "https://twitter.com/SmithZannou",
    "https://luap-dever.me",
  ],
};

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Paul Mèdédji ZANNOU — Ingénieur logiciel full-stack (Luap Dever)"
        description="Ingénieur logiciel full-stack basé à Cotonou : web, mobile, temps réel et DevOps. Je transforme des idées ambitieuses en produits fiables — Vue.js, NestJS, Flutter, Docker."
        jsonLd={personJsonLd}
      />
      <main>
        <HomePage />
      </main>
    </>
  );
}
