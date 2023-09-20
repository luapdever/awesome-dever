import dever from "../assets/img/icons/projects/DEVER.svg";
import contactImg from "../assets/img/icons/projects/contact.png";
import console from "../assets/img/icons/console.png";
import appIcon from "../assets/img/icons/appStore.png";
import sevexchange from "../assets/img/icons/projects/sevexchange.png";

import WinIframe from "../components/global/custiframe";
import AppStore from "../components/specific/portfolio/wndows/AppStore";
import Contact from "../components/specific/portfolio/wndows/Contact";
import Terminal from "../components/specific/portfolio/wndows/Terminal";

export const performances = [
  {
    id: "dever",
    icon: dever.src,
    label: "My Blog",
    isLink: true,
    url: "https://blog-luap-dever.netlify.app/",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "December 15, 2021",
      addedAt: "October 20, 2022",
      technos: (
        <>
          <b>Vue and Nuxt JS, Laravel</b>
        </>
      ),
      more: "This is where all my performances and news that I want to share will be found.",
    },
  },
  {
    id: "terminal",
    icon: console.src,
    label: "Terminal",
    bg: "#00000000",
    content: <Terminal />,
    properties: {
      createdAt: "October 20, 2022",
      addedAt: "October 20, 2022",
      technos: (
        <>
          <b>React JS</b>
        </>
      ),
      more: "Discover information about me by typing in a command line.",
    },
  },
  {
    id: "contact",
    icon: contactImg.src,
    label: "Contact me",
    get content() {
      return <Contact />;
    },
    properties: {
      createdAt: "December 15, 2021",
      addedAt: "October 20, 2022",
      technos: (
        <>
          <b>Next JS</b>
        </>
      ),
      more: "You can contact me with form on this window.",
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
      technos: (
        <>
          <b>Flutter</b>
        </>
      ),
      more: "Discover my all mobile project with Flutter technology.",
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
      technos: (
        <>
          <b>Nuxt JS, Strapi</b>
        </>
      ),
      more: "E-commerce application offering sales of various categories of items such as Clothes, Jewel, Look; ... This application evokes functionality from order to delivery.",
    },
  },
  {
    id: "avcall",
    icon: "https://api.iconify.design/healthicons:group-discussion-meeting.svg",
    bg: "#fff",
    label: "AV Call",
    isLink: true,
    url: "https://avcall.netlify.app",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "January 08, 2023",
      addedAt: "January 08, 2023",
      technos: (
        <>
          <b>React JS</b>
        </>
      ),
      more: "Do quickly meeting in one click... (Audio an Video Call).",
    },
  },
  {
    id: "wecard",
    icon: "https://wecard-dever.netlify.app/card.png",
    bg: "#333333",
    label: "WeCard",
    isLink: true,
    url: "https://wecard-dever.netlify.app",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "September 18, 2019",
      addedAt: "October 20, 2022",
      technos: (
        <>
          <b>Vue JS</b>
        </>
      ),
      more: "Generate your virtual credit card and get everything in picture.",
    },
  },
  {
    id: "jenny",
    icon: "https://jennyfer-portfolio.netlify.app/img/fav.jpg",
    bg: "#ffffff",
    label: "Jenny Portfolio",
    isLink: true,
    url: "https://jennyfer-portfolio.netlify.app/",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "September 05, 2022",
      addedAt: "September 20, 2023",
      technos: (
        <>
          <b>HTML</b>, <b>CSS</b>, <b>Bootstrap</b>
        </>
      ),
      more: "Jennyfer personal website.",
    },
  },
  {
    id: "aws",
    icon: "https://aws.bj/logo.png",
    bg: "#181b1c",
    label: "AWS",
    isLink: true,
    url: "https://aws.bj",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "July 30, 2022",
      addedAt: "October 20, 2022",
      technos: (
        <>
          <b>React and Next JS</b>
        </>
      ),
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
      more: "Official All Web Service website.",
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
      technos: (
        <>
          <b>PHP, Bootstrap</b>
        </>
      ),
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
      more: "With Kloo, Increase engagement and traffic via links and micro-pages. Enrich your Instagram Bio pages. Videos, Music, Instagram Posts, ...",
    },
  },
];
