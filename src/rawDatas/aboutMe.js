import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

/* Réseaux sociaux — source unique, consommée par le nav et la page /about-me.
   (Les anciennes structures `me`, `formations` et `listSkills` — doublons de
   skillset.js / about/index.jsx — ont été retirées : elles n'étaient plus
   consommées que par des composants morts, désormais supprimés.) */
export const socialMedias = [
  { icon: <FaGithub />, link: "https://github.com/luapdever" },
  { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/paul-zannou-b253a2205" },
  { icon: <FaFacebook />, link: "https://facebook.com/paulsmith.zannou" },
  { icon: <FaTwitter />, link: "https://twitter.com/SmithZannou" },
  { icon: <>View my blog</>, link: "https://luap-dever.netlify.app" },
];
