import routes from "./projectRoutes.json";
import { collaborations } from "../rawDatas/home";
import { vaultProjects } from "../rawDatas/vaultProjects";
import { tx } from "../rawDatas/i18n";
import cvFr from "../../public/cv/data/content.fr.json";
import cvEn from "../../public/cv/data/content.en.json";

const key = (value) => { const url = new URL(value); return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}`; };
export function publicProjects(lang) {
  return routes.map((route) => {
    const card = collaborations.find((item) => key(item.url) === key(route.url));
    const detail = vaultProjects.find((item) => item.link && !item.hidden && key(item.link.url) === key(route.url));
    const emilia = route.slug === "emilia-cross" ? (lang === "en" ? cvEn : cvFr).projects.find((item) => item.id === "emilia") : null;
    return {
      slug: route.slug, name: card.name, url: route.url,
      client: tx(card.client, lang), category: tx(card.tag, lang),
      description: tx(detail?.desc, lang) || emilia?.desc || tx(card.tag, lang),
      role: tx(detail?.role, lang) || emilia?.role || null,
      year: detail?.year || emilia?.year || null,
      stack: detail?.stack || emilia?.stack || [],
      article: emilia ? "/blog/emilia-cross-visio-facturee-a-la-minute" : null,
      publicDetection: route.slug === "celtiis",
    };
  });
}
