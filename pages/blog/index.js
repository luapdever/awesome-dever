import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../../src/components/global/seo";
import { blogPosts, CATEGORIES, readingMinutes, tr } from "../../src/rawDatas/blog";
import { useLandingLang } from "../../src/context/landingLang";
import styles from "../../styles/specific/blog/blog.module.css";

const ORIGIN = "https://luap-dever.netlify.app";
const PER_PAGE = 9;

const UI = {
  fr: {
    kicker: "Le journal",
    title: "Le blog",
    subtitle: "Des billets tech, de la culture dev, un peu d'IA — et quelques carnets de voyage.",
    searchPh: "Rechercher un article…",
    noResults: "Aucun article ne correspond à ta recherche.",
    minRead: "min de lecture",
  },
  en: {
    kicker: "The journal",
    title: "The blog",
    subtitle: "Tech notes, dev culture, a bit of AI — and a few travel journals.",
    searchPh: "Search an article…",
    noResults: "No article matches your search.",
    minRead: "min read",
  },
};

const CAT_EN = { Tous: "All", Projet: "Project", Dev: "Dev", IA: "AI", "Carrière": "Career", Voyage: "Travel" };
const catLabel = (c, lang) => (lang === "en" ? CAT_EN[c] || c : c);

// Normalise : minuscules + suppression des accents (recherche tolérante).
const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

function BlogCard({ p, L, minRead, fmtDate }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link href={`/blog/${p.slug}`} className={styles.card}>
      <div className={styles.cardImg}>
        {!loaded && <span className={styles.shimmer} aria-hidden="true" />}
        <img
          src={p.cover}
          alt=""
          loading="lazy"
          className={`${styles.cardImgEl} ${loaded ? styles.imgLoaded : ""}`}
          onLoad={() => setLoaded(true)}
        />
        <span className={styles.cardCat}>{catLabel(p.category, L)}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span>{fmtDate(p.date)}</span>
          <span>· {readingMinutes(p)} {minRead}</span>
        </div>
        <h2 className={styles.cardTitle}>{tr(p.title, L)}</h2>
        <p className={styles.cardExcerpt}>{tr(p.excerpt, L)}</p>
        <div className={styles.cardTags}>
          {p.tags.slice(0, 3).map((tg) => (
            <span key={tg} className={styles.tag}>#{tg}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// Squelette de carte (affiché au tout premier rendu, le temps de l'hydratation).
function SkeletonCard() {
  return (
    <div className={`${styles.card} ${styles.skelCard}`} aria-hidden="true">
      <div className={styles.cardImg}><span className={styles.shimmer} /></div>
      <div className={styles.cardBody}>
        <span className={`${styles.shimmer} ${styles.skelLine} ${styles.skelShort}`} />
        <span className={`${styles.shimmer} ${styles.skelLine}`} />
        <span className={`${styles.shimmer} ${styles.skelLine}`} />
        <span className={`${styles.shimmer} ${styles.skelLine} ${styles.skelShort}`} />
      </div>
    </div>
  );
}

export default function BlogIndex() {
  const router = useRouter();
  const { lang } = useLandingLang();
  const L = lang === "en" ? "en" : "fr";
  const t = UI[L];
  const [cat, setCat] = useState("Tous");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  const inited = useRef(false);

  // Petit squelette au montage (ressenti « chargement »), puis contenu.
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 280);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => setPage(1), [cat, q]);

  // Init depuis les query params (?search= & ?cat=) — état partageable / persistant.
  useEffect(() => {
    if (!router.isReady || inited.current) return;
    inited.current = true;
    const { search, cat: qcat } = router.query;
    if (typeof search === "string") setQ(search);
    if (typeof qcat === "string" && CATEGORIES.includes(qcat)) setCat(qcat);
  }, [router.isReady, router.query]);

  // Reflète l'état dans l'URL (debounce léger, remplacement shallow → pas de reload).
  useEffect(() => {
    if (!inited.current) return;
    const id = setTimeout(() => {
      const query = {};
      if (q.trim()) query.search = q.trim();
      if (cat !== "Tous") query.cat = cat;
      router.replace({ pathname: "/blog", query }, undefined, { shallow: true, scroll: false });
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q]);

  const filtered = useMemo(() => {
    // Recherche tolérante : insensible aux accents/casse, par mots (tous requis).
    const tokens = norm(q).split(/\s+/).filter(Boolean);
    return blogPosts.filter((p) => {
      if (cat !== "Tous" && p.category !== cat) return false;
      if (!tokens.length) return true;
      const hay = norm(
        `${tr(p.title, "fr")} ${tr(p.title, "en")} ${tr(p.excerpt, "fr")} ${tr(p.excerpt, "en")} ${p.tags.join(" ")} ${p.category}`
      );
      return tokens.every((tok) => hay.includes(tok));
    });
  }, [cat, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(L === "en" ? "en-US" : "fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: L === "en" ? "The blog — Paul Mèdédji Zannou" : "Le blog — Paul Mèdédji Zannou",
    description: t.subtitle,
    inLanguage: "fr",
    url: `${ORIGIN}/blog`,
    author: { "@type": "Person", name: "Paul Mèdédji Zannou", url: ORIGIN },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: tr(p.title, L),
      datePublished: p.date,
      url: `${ORIGIN}/blog/${p.slug}`,
      image: `${ORIGIN}${p.cover}`,
      articleSection: p.category,
    })),
  };

  return (
    <>
      <Seo
        path="/blog"
        title={L === "en" ? "The blog — Paul Mèdédji ZANNOU" : "Le blog — Paul Mèdédji ZANNOU"}
        description={t.subtitle}
        image="awesome-dever.png"
        jsonLd={jsonLd}
      />
      <main className={styles.wrap}>
        <header className={styles.hero}>
          <span className={styles.kicker}>{t.kicker}</span>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </header>

        <div className={styles.controls}>
          <div className={styles.chips}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`${styles.chip} ${cat === c ? styles.chipOn : ""}`}
                onClick={() => setCat(c)}
              >
                {catLabel(c, L)}
              </button>
            ))}
          </div>
          <input
            type="search"
            className={styles.search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.searchPh}
            aria-label={t.searchPh}
          />
        </div>

        {!ready ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <p className={styles.empty}>{t.noResults}</p>
        ) : (
          <>
            <div className={styles.grid}>
              {shown.map((p) => (
                <BlogCard key={p.slug} p={p} L={L} minRead={t.minRead} fmtDate={fmtDate} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="pagination">
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage((n) => Math.max(1, n - 1))}
                  disabled={page === 1}
                >←</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.pageBtn} ${page === i + 1 ? styles.pageOn : ""}`}
                    onClick={() => setPage(i + 1)}
                  >{i + 1}</button>
                ))}
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
                  disabled={page === totalPages}
                >→</button>
              </nav>
            )}
          </>
        )}
      </main>
    </>
  );
}
