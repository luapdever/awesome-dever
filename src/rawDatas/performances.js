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
    id: "dvdesktop",
    icon: dever.src,
    label: "DVDesktop",
    isLink: true,
    url: "https://kamgoko.com/demos/paul/virtual-desktop/",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "February 15, 2023",
      addedAt: "March 15, 2024",
      technos: (
        <>
          <b>Vue JS</b>
        </>
      ),
      more: "Explore virtual desktop.",
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
    id: "facebookconnect",
    icon: "https://img.icons8.com/quill/50/facebook.png",
    bg: "#ffffff",
    label: "FB Connect",
    isLink: true,
    url: "https://tranquil-fbconnect.netlify.app/",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "Avril 01, 2023",
      addedAt: "September 20, 2023",
      technos: (
        <>
          <b>Vue JS</b>
        </>
      ),
      more: "Jennyfer personal website.",
    },
  },
  {
    id: "gocoachings",
    icon: "https://www.gocoachings.com/favicon1.png",
    bg: "#fff",
    label: "GoCoachings",
    isLink: true,
    url: "https://www.gocoachings.com",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "July 25, 2023",
      addedAt: "March 14, 2024",
      technos: (
        <>
          <b>Nuxt.js, Strapi, Node.js, SCSS</b>
        </>
      ),
      collaboraters: (
        <>
          <b>Fidèle SODOGA</b> - <b>Fresnel AGLOSSI</b>
        </>
      ),
      more: "The all-in-one platform for managing, monitoring and measuring your coaching sessions.",
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
      technos: (
        <>
          <b>React, Node JS</b>
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
      more: "Exchange your Crypto and Mobile Money currencies easily and securely.",
    },
  },
  {
    id: "ninjalinking",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAPFBMVEVHcEz//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4P//4O5UZg5AAAAFHRSTlMARzoIEGxTmq4neMGCHozM/WC7606F424AAAETSURBVCiRdZJJgsQgCEURBRTneP+7NlZiuhbdrpTP+BDgPj5xESmcPHyfwJL7FePVs3D4taeSYyNSJm0xl3TsKNuMTv2cSBIFH3+7uupSSFArqrPnJyYUs8eT2FRTyn5yFgdvQQ8hupbZbhJJTznP26lSFA8pN8QTgH2Zr6OWE3DXWU+AjBZsVqTOUC56hTn67jQ4ugpIZKMgu3e/hm4iSTWKCWq1ZVwVriHh6cEES+UC1L6IxrpHrnOn4k5o3dJalggeQa24tUvOHnGMdSMPiLvdPWC11LzGfNjpZ0BD0jYqj+4JMFgbyQ0R0ksxHog3dsVaTU3G/2D/LEoI5/TqkKi9i3pWq8S6zV+r/f8z/PV9fgDxlAwONqjLlwAAAABJRU5ErkJggg==",
    label: "NinjaLinking",
    isLink: true,
    url: "https://app.ninjalinking.fr",
    get content() {
      return <WinIframe props={{ source: this.url }} />;
    },
    properties: {
      createdAt: "Avril 20, 2024",
      addedAt: "June 23, 2024",
      technos: (
        <>
          <b>Vue.js, Laravel, Tailwind CSS</b>
        </>
      ),
      collaboraters: (
        <>
          <b>Fidèle SODOGA</b> - <b>Fresnel AGLOSSI</b>
        </>
      ),
      more: "Plateforme pour rechercher des backlinks à vos liens références.",
    },
  },
];
