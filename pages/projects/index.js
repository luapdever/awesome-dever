import Link from "next/link";
import Seo from "../../src/components/global/seo";
import { breadcrumbLd } from "../../src/lib/seoSchema";
import { localizedPath } from "../../src/lib/localeUrl.mjs";
import { publicProjects } from "../../src/data/projectPages";
import styles from "../../styles/specific/projects.module.css";

export default function Projects({ projects, lang }) {
  const en = lang === "en";
  const title = en ? "Projects" : "Projets";
  const url = `https://paulzannou.com${localizedPath("/projects", lang)}`;
  return <>
    <Seo path="/projects" title={`${title} | Paul Mèdédji ZANNOU`} description={en ? "Explore Paul Zannou’s public projects: Celtiis and MTN via KAMGOKO, and Emilia Cross for France Assist." : "Découvrez les projets publics de Paul Zannou : Celtiis et MTN via KAMGOKO, et Emilia Cross pour France Assist."}
      jsonLd={[breadcrumbLd([{ name: en ? "Home" : "Accueil", path: localizedPath("/", lang) }, { name: title, path: localizedPath("/projects", lang) }]), {
        "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, inLanguage: lang,
        mainEntity: { "@type": "ItemList", itemListElement: projects.map((project, i) => ({ "@type": "ListItem", position: i + 1, name: project.name, url: `https://paulzannou.com${localizedPath(`/projects/${project.slug}`, lang)}` })) },
      }]} />
    <main className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label={en ? "Breadcrumb" : "Fil d’Ariane"}><Link href="/">{en ? "Home" : "Accueil"}</Link><span aria-current="page">{title}</span></nav>
      <h1>{title}</h1>
      <p>{en ? "Public projects, client credits and documented technologies." : "Projets publics, crédits clients et technologies documentées."}</p>
      <ul className={styles.grid}>{projects.map((project) => <li key={project.slug}><Link href={`/projects/${project.slug}`}><h2>{project.name}</h2><span>{project.client}</span><p>{project.category}</p></Link></li>)}</ul>
    </main>
  </>;
}
export function getStaticProps({ locale }) {
  const lang = locale === "en" ? "en" : "fr";
  return { props: { projects: publicProjects(lang), lang } };
}
