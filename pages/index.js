import Seo from "../src/components/global/seo";
import HomePage from "../src/components/specific/home";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul M. ZANNOU",
  alternateName: "Luap Dever",
  jobTitle: "Fullstack Developer",
  url: "https://luap-dever.me",
  image: "https://luap-dever.netlify.app/luap.png",
  description:
    "Fullstack developer of digital solutions, creative interfaces, web services and APIs.",
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
    <div className={"container"}>
      <Seo path="/" jsonLd={personJsonLd} />
      <main>
        <HomePage />
      </main>
    </div>
  );
}
