import dever from "../assets/img/icons/projects/DEVER.svg";
import appIcon from "../assets/img/icons/appStore.png";
import sevexchange from "../assets/img/icons/projects/sevexchange.png";
import WinIframe from "../components/global/custiframe";
import AppStore from "../components/specific/portfolio/wndows/AppStore";

export const performances = [
  {
    id: "dever",
    icon: "https://www.google.com/s2/favicons?domain=https://luap-dever.me&sz=64",
    label: "My Blog",
    isLink: true,
    url: "https://luap-dever.me",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "June 30, 2019",
      addedAt: "October 20, 2022",
      more: "More Details dever",
    },
  },
  {
    id: "appStore",
    icon: appIcon.src,
    bg: "#999",
    label: "App Store",
    get content() {
      return <AppStore />;
    },
    properties: {
      createdAt: "June 30, 2019",
      addedAt: "October 20, 2022",
      more: "More Details appStore",
    },
  },
  {
    id: "devshop",
    icon: "https://devshop-luap.netlify.app/_nuxt/img/DevShop.625c106.svg",
    bg: "#000000bb",
    label: "DevShop",
    isLink: true,
    url: "https://devshop-luap.netlify.app",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "June 30, 2019",
      addedAt: "October 20, 2022",
      more: "More Details devshop",
    },
  },
  {
    id: "kloo",
    icon: "https://kloo.me/themes/altum/assets/images/customs/kloo.svg",
    bg: "#4062ff",
    label: "Kloo",
    isLink: true,
    url: "https://kloo.me",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "June 30, 2019",
      addedAt: "October 20, 2022",
      collaboraters: (
        <>
          <a
            href={"https://github.com/Mohamed-Fdl"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Fadel ABOU</b>
          </a>{" "}
          -
          <a
            href={"https://github.com/EvansUchwa"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Evans Uchwa</b>
          </a>
        </>
      ),
      more: "More Details kloo",
    },
  },
  {
    id: "sevexchange",
    icon: sevexchange.src,
    label: "Sevexchange",
    isLink: true,
    url: "https://sevexchange.com",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "June 30, 2019",
      addedAt: "October 20, 2022",
      collaboraters: (
        <>
          <a
            href={"https://github.com/Mohamed-Fdl"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Fadel ABOU</b>
          </a>{" "}
          -
          <a
            href={"https://github.com/EvansUchwa"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Evans Uchwa</b>
          </a>
        </>
      ),
      more: "More Details sevexchange",
    },
  },
];
