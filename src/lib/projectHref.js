import routes from "../data/projectRoutes.json";

const key = (value) => { const url = new URL(value); return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}`; };
export function projectHref(url) {
  const project = routes.find((route) => key(route.url) === key(url));
  return project ? `/projects/${project.slug}` : null;
}
