import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Seo from "../../src/components/global/seo";
import { breadcrumbLd } from "../../src/lib/seoSchema";
import { localizedPath } from "../../src/lib/localeUrl.mjs";
import { publicProjects } from "../../src/data/projectPages";
import routes from "../../src/data/projectRoutes.json";
import styles from "../../styles/specific/projects.module.css";

export default function Project({ project, lang }) {
  const en = lang === "en";
  const path = `/projects/${project.slug}`;
  const url = `https://paulzannou.com${localizedPath(path, lang)}`;
  const description = `${project.name} · ${project.client}. ${project.category}.`;
  return <>
    <Seo path={path} title={`${project.name} | ${en ? "Project" : "Projet"} | Paul Zannou`} description={description} jsonLd={[
      { "@context": "https://schema.org", "@type": "WebPage", name: project.name, description, url, inLanguage: lang, about: { "@type": "WebSite", name: project.name, url: project.url } },
      breadcrumbLd([{ name: en ? "Home" : "Accueil", path: localizedPath("/", lang) }, { name: en ? "Projects" : "Projets", path: localizedPath("/projects", lang) }, { name: project.name, path: localizedPath(path, lang) }]),
    ]} />
    <main className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label={en ? "Breadcrumb" : "Fil d’Ariane"}><Link href="/">{en ? "Home" : "Accueil"}</Link><Link href="/projects">{en ? "Projects" : "Projets"}</Link><span aria-current="page">{project.name}</span></nav>
      <h1>{project.name}</h1>
      <div className={styles.meta}><span data-language-text>{project.client}</span><span data-language-text>{project.category}</span>{project.year && <span>{project.year}</span>}</div>
      <section className={styles.details} aria-labelledby="project-overview"><h2 id="project-overview">{en ? "Overview" : "Présentation"}</h2><p>{project.description}</p>{project.role && <p>{en ? "Role" : "Rôle"} : {project.role}</p>}</section>
      {project.stack.length > 0 && <section aria-labelledby="project-technologies"><h2 id="project-technologies">{project.publicDetection ? en ? "Publicly detected technologies" : "Technologies détectées publiquement" : en ? "Documented technologies" : "Technologies documentées"}</h2><ul className={styles.stack}>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul></section>}
      <div className={styles.actions}><a href={project.url} target="_blank" rel="noopener noreferrer">{en ? "Visit the website" : "Visiter le site"}<FiArrowUpRight aria-hidden="true" /></a>{project.article && <Link href={project.article}>{en ? "Read the case study" : "Lire l’étude de cas"}</Link>}<Link href="/#collaborer">{en ? "Contact Paul" : "Contacter Paul"}</Link></div>
    </main>
  </>;
}
export function getStaticPaths({ locales }) {
  return { paths: (locales || ["fr", "en"]).flatMap((locale) => routes.map((route) => ({ params: { slug: route.slug }, locale }))), fallback: false };
}
export function getStaticProps({ params, locale }) {
  const lang = locale === "en" ? "en" : "fr";
  const project = publicProjects(lang).find((item) => item.slug === params.slug);
  return project ? { props: { project, lang } } : { notFound: true };
}
