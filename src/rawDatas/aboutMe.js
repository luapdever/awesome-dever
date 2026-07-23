import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

/* Réseaux sociaux — source unique, consommée par le nav et la page /about-me.
   (Les anciennes structures `me`, `formations` et `listSkills` — doublons de
   skillset.js / about/index.jsx — ont été retirées : elles n'étaient plus
   consommées que par des composants morts, désormais supprimés.) */
// `name` sert de nom accessible (aria-label) pour les liens icône-only (nav + footer).
export const socialMedias = [
  { name: "GitHub", icon: <FaGithub />, link: "https://github.com/luapdever" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://linkedin.com/in/paul-zannou-b253a2205" },
  { name: "Facebook", icon: <FaFacebook />, link: "https://facebook.com/paulsmith.zannou" },
  { name: "Twitter / X", icon: <FaTwitter />, link: "https://twitter.com/SmithZannou" },
  { name: "Blog", icon: <>View my blog</>, link: "https://luap-dever.netlify.app" },
];
