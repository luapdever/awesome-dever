import Link from "next/link";
import Seo from "../../src/components/global/seo";
import ShareBar from "../../src/components/global/ShareBar";
import ArticleReader, { HEADING, slugify } from "../../src/components/global/ArticleReader";
import ArticleToc from "../../src/components/global/ArticleToc";
import VideoModal from "../../src/components/global/VideoModal";
import BlogUseCases from "../../src/components/global/BlogUseCases";
import { blogPosts, readingMinutes, tr } from "../../src/rawDatas/blog";
import { useLandingLang } from "../../src/context/landingLang";
import styles from "../../styles/specific/blog/article.module.css";
import { breadcrumbLd } from "../../src/lib/seoSchema";

const ORIGIN = "https://paulzannou.com";
const CAT_EN = { Dev: "Dev", IA: "AI", "Carrière": "Career", Voyage: "Travel" };
const catLabel = (c, lang) => (lang === "en" ? CAT_EN[c] || c : c);

const UI = {
  fr: { back: "Tous les articles", minRead: "min de lecture", prev: "Précédent", next: "Suivant", written: "Publié le" },
  en: { back: "All articles", minRead: "min read", prev: "Previous", next: "Next", written: "Published on" },
};

export default function Article({ post, prev, next }) {
  const { lang } = useLandingLang();
  const L = lang === "en" ? "en" : "fr";
  const t = UI[L];
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(L === "en" ? "en-US" : "fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const title = tr(post.title, L);
  const excerpt = tr(post.excerpt, L);
  const isText = (c) => typeof c === "string" || (c && c.fr !== undefined);
  const bodyText = post.content.filter(isText).map((c) => tr(c, L)).join(" ");
  /* Le chemin doit porter la locale : sans préfixe, la page anglaise déclarait
     l'URL française en JSON-LD pendant que son canonical pointait l'anglaise.
     Deux signaux contradictoires sur la même page. */
  const path = `${L === "en" ? "/en" : ""}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: L,
    /* Plusieurs images plutôt qu'une : Google choisit la mieux adaptée au
       format de résultat. La couverture reste en tête. */
    image: [post.cover, ...post.content.filter((c) => c && c.fig).map((c) => c.fig)]
      .filter(Boolean)
      .map((src) => `${ORIGIN}${src}`),
    timeRequired: `PT${readingMinutes(post)}M`,
    url: `${ORIGIN}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${ORIGIN}${path}` },
    wordCount: bodyText.split(/\s+/).filter(Boolean).length,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: "Paul Mèdédji Zannou",
      url: ORIGIN,
      sameAs: ["https://github.com/luapdever", "https://www.linkedin.com/in/paul-zannou"],
    },
    publisher: { "@type": "Person", name: "Paul Mèdédji Zannou", url: ORIGIN },
    /* Les sources citées dans le corps, déclarées comme telles : un article
       qui s'appuie sur des références vérifiables le dit à la machine aussi. */
    ...(() => {
      const cites = post.content.filter((c) => c && c.quote && c.href);
      return cites.length
        ? { citation: cites.map((c) => ({ "@type": "CreativeWork", name: c.source, url: c.href })) }
        : {};
    })(),
  };
  /* Sans VideoObject, Google voit une page qui contient une vidéo mais ne sait
     pas laquelle : ni vignette vidéo dans les résultats, ni éligibilité à
     l'onglet Vidéos. `uploadDate` et `thumbnailUrl` sont exigés. */
  const videoLd = post.video && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: excerpt,
    thumbnailUrl: `${ORIGIN}${post.cover}`,
    contentUrl: `${ORIGIN}${post.video}`,
    uploadDate: post.date,
    inLanguage: L,
    ...(post.videoDuration ? { duration: post.videoDuration } : {}),
  };
  /* Un bloc est soit du texte (chaîne bilingue), soit une figure, soit une
     citation. Tout est résolu ICI : le lecteur reçoit des valeurs prêtes. */
  const paragraphs = post.content.map((c) => {
    if (isText(c)) return tr(c, L);
    if (c.fig) return { fig: c.fig, alt: tr(c.alt, L), caption: tr(c.caption, L) };
    return { quote: tr(c.quote, L), source: c.source, href: c.href };
  });
  // Le sommaire se déduit du contenu, pas du DOM : il existe donc au rendu serveur.
  const toc = paragraphs
    .filter((p) => typeof p === "string" && HEADING.test(p))
    .map((p) => ({ id: slugify(p), text: p.replace(HEADING, "") }));
  const gallery = (post.images || []).slice(1); // le cover est déjà en tête

  return (
    <>
      <Seo
        path={`/blog/${post.slug}`}
        title={`${title} — ${L === "en" ? "The blog" : "Le blog"}`}
        description={excerpt}
        image={post.cover}
        type="article"
        jsonLd={[
          jsonLd,
          breadcrumbLd([
            { name: L === "en" ? "Home" : "Accueil", path: L === "en" ? "/en" : "/" },
            { name: L === "en" ? "The blog" : "Le blog", path: `${L === "en" ? "/en" : ""}/blog` },
            { name: title, path },
          ]),
          ...(videoLd ? [videoLd] : []),
        ]}
      />
      <main className={styles.wrap}>
        <Link href="/blog" className={styles.back}>← {t.back}</Link>

        <article className={styles.article}>
          <header className={styles.head}>
            <div className={styles.meta}>
              <span className={styles.cat}>{catLabel(post.category, L)}</span>
              <span>{fmtDate(post.date)}</span>
              <span>· {readingMinutes(post)} {t.minRead}</span>
            </div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.excerpt}>{excerpt}</p>
          </header>

          {post.cover && (
            <figure className={styles.cover}>
              {post.video ? (
                <VideoModal
                  src={post.video}
                  poster={post.cover}
                  alt={title}
                  duration={post.videoDuration}
                  caption={L === "en" ? "Tap to play — 7 seconds of pure failure" : "Clique pour lancer — 7 secondes d'échec intégral"}
                />
              ) : (
                <img src={post.cover} alt={title} loading="eager" />
              )}
            </figure>
          )}

          {toc.length > 1 && <ArticleToc items={toc} label={L === "en" ? "On this page" : "Sur cette page"} />}
          <ArticleReader paragraphs={paragraphs} lang={L} />

          {post.useCases && post.useCases.length > 0 && <BlogUseCases useCases={post.useCases} lang={L} />}

          {post.ctas && post.ctas.length > 0 && (
            <div className={styles.ctaGrid}>
              {post.ctas.map((c) =>
                c.external ? (
                  <a key={c.href} className={styles.ctaCard} href={c.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.ctaLabel}>{tr(c.label, L)} <b>↗</b></span>
                    <span className={styles.ctaDesc}>{tr(c.desc, L)}</span>
                  </a>
                ) : (
                  <Link key={c.href} href={c.href} className={styles.ctaCard}>
                    <span className={styles.ctaLabel}>{tr(c.label, L)} <b>→</b></span>
                    <span className={styles.ctaDesc}>{tr(c.desc, L)}</span>
                  </Link>
                )
              )}
            </div>
          )}

          {gallery.length > 0 && (
            <div className={styles.gallery}>
              {gallery.map((src, i) => (
                <img key={i} src={src} alt={`${post.title} — ${i + 2}`} loading="lazy" />
              ))}
            </div>
          )}

          <div className={styles.tags}>
            {post.tags.map((tg) => (
              <span key={tg} className={styles.tag}>#{tg}</span>
            ))}
          </div>

          <ShareBar url={`${ORIGIN}${path}`} title={title} />
        </article>

        <nav className={styles.pager}>
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerDir}>← {t.prev}</span>
              <span className={styles.pagerTitle}>{tr(prev.title, L)}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/blog/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerDir}>{t.next} →</span>
              <span className={styles.pagerTitle}>{tr(next.title, L)}</span>
            </Link>
          ) : <span />}
        </nav>
      </main>
    </>
  );
}

/* Avec l'i18n, un chemin sans `locale` n'est généré que pour la locale par
   défaut : les 17 articles anglais renvoyaient 404. On produit donc le produit
   cartésien articles × locales. */
export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    for (const p of blogPosts) paths.push({ params: { slug: p.slug }, locale });
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const i = blogPosts.findIndex((p) => p.slug === params.slug);
  if (i === -1) return { notFound: true };
  return {
    props: {
      post: blogPosts[i],
      prev: blogPosts[i + 1] || null, // plus ancien
      next: blogPosts[i - 1] || null, // plus récent
    },
  };
}
