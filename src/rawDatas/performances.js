import dever from "../assets/img/icons/projects/DEVER.svg";
import sevexchange from "../assets/img/icons/projects/sevexchange.png";
import WinIframe from "../components/global/custiframe";

export const performances = [
  {
    id: "dever",
    icon: "https://www.google.com/s2/favicons?domain=https://luap-dever.me&sz=64",
    label: "My Blog",
    content: (
      <WinIframe props={{ source: "https://luap-dever.me" }} />
    ),
  },
  {
    id: "devshop",
    icon: "https://devshop-luap.netlify.app/_nuxt/img/DevShop.625c106.svg",
    bg: "#000000bb",
    label: "DevSop",
    content: (
      <WinIframe props={{ source: "https://devshop-luap.netlify.app" }} />
    ),
  },
  {
    id: "kloo",
    icon: "https://kloo.me/themes/altum/assets/images/customs/kloo.svg",
    bg: "#4062ff",
    label: "Kloo",
    content: (
      <WinIframe props={{ source: "https://kloo.me" }} />
    ),
  },
  {
    id: "sevexchange",
    icon: sevexchange.src,
    label: "Sevexchange",
    content: (
      <WinIframe props={{ source: "https://sevexchange.com" }} />
    ),
  },
];
