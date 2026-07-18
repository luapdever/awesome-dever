import Link from "next/link";
import Seo from "../../src/components/global/seo";
import { blogPosts, readingMinutes, tr } from "../../src/rawDatas/blog";
import { useLandingLang } from "../../src/context/landingLang";
import styles from "../../styles/specific/blog/article.module.css";

const ORIGIN = "https://luap-dever.netlify.app";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.date,
    inLanguage: L,
    image: `${ORIGIN}${post.cover}`,
    url: `${ORIGIN}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: { "@type": "Person", name: "Paul Mèdédji Zannou", url: ORIGIN },
    publisher: { "@type": "Person", name: "Paul Mèdédji Zannou" },
  };
  const gallery = (post.images || []).slice(1); // le cover est déjà en tête

  return (
    <>
      <Seo path={`/blog/${post.slug}`} title={`${title} — ${L === "en" ? "The blog" : "Le blog"}`} description={excerpt} image={post.cover} type="article" jsonLd={jsonLd} />
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
              <img src={post.cover} alt={title} loading="eager" />
            </figure>
          )}

          <div className={styles.body}>
            {post.content.map((para, i) => (
              <p key={i}>{tr(para, L)}</p>
            ))}
          </div>

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

export async function getStaticPaths() {
  return { paths: blogPosts.map((p) => ({ params: { slug: p.slug } })), fallback: false };
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
