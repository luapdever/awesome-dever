import Head from "next/head";
import { useRouter } from "next/router";

const SITE_NAME = "Paul Mèdédji ZANNOU — Luap Dever";
const DEFAULT_DESCRIPTION =
  "Paul Mèdédji ZANNOU (Luap Dever) — ingénieur logiciel full-stack à Cotonou : web, mobile, temps réel et DevOps. Backend distribué (NestJS, Node.js, PostgreSQL), interfaces réactives (Vue.js, Flutter), paiements, streaming vidéo et écosystèmes WordPress d'entreprise.";
const TWITTER = "@SmithZannou";

// Origine canonique (sans slash final) — source unique : appUrl (next.config).
const ORIGIN = (process.env.appUrl || "https://paulzannou.com").replace(/\/+$/, "");

/**
 * <head> centralisé pour le SEO : title, description, canonical, robots,
 * Open Graph, Twitter cards, locale et JSON-LD optionnel.
 */
function Seo({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "awesome-dever.png",
  type = "website",
  locale: localeOverride,
  noindex = false,
  jsonLd,
}) {
  /* Le canonique doit désigner la locale COURANTE, jamais toujours le français :
     sinon la version anglaise se déclarerait doublon de la française et ne
     serait pas indexée. Les `hreflang` réciproques relient les deux, et
     `x-default` désigne la version servie à un visiteur sans préférence. */
  const { locale = "fr" } = useRouter() || {};
  const prefix = locale === "fr" ? "" : `/${locale}`;
  // Open Graph attend la forme longue (fr_FR), pas le code court du routeur.
  const OG = { fr: "fr_FR", en: "en_US" };
  const ogLocale = localeOverride || OG[locale] || "fr_FR";
  const ogAlternate = ogLocale === "fr_FR" ? "en_US" : "fr_FR";
  const url = `${ORIGIN}${prefix}${path}`;
  const altFr = `${ORIGIN}${path}`;
  const altEn = `${ORIGIN}/en${path}`;
  const imageUrl = image?.startsWith("http") ? image : `${ORIGIN}/${image.replace(/^\/+/, "")}`;
  const imgType = /\.jpe?g($|\?)/i.test(imageUrl) ? "image/jpeg" : "image/png";
  const isDefaultImage = image === "awesome-dever.png"; // seule image dont on connaît les dims

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content="Paul Mèdédji ZANNOU" />
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}
      />
      <link rel="canonical" href={url} />
      <link rel="alternate" hreflang="fr" href={altFr} />
      <link rel="alternate" hreflang="en" href={altEn} />
      <link rel="alternate" hreflang="x-default" href={altFr} />
      <link rel="image_src" href={imageUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} key="ogsite" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content={type} key="ogtype" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:locale" content={ogLocale} key="oglocale" />
      <meta property="og:locale:alternate" content={ogAlternate} key="oglocalealt" />
      <meta property="og:image" content={imageUrl} key="ogimage" />
      <meta property="og:image:secure_url" content={imageUrl} key="ogimagesecure" />
      <meta property="og:image:type" content={imgType} key="ogimagetype" />
      {isDefaultImage && <meta property="og:image:width" content="1492" key="ogimagew" />}
      {isDefaultImage && <meta property="og:image:height" content="993" key="ogimageh" />}
      <meta property="og:image:alt" content={title} key="ogimagealt" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER} />
      <meta name="twitter:creator" content={TWITTER} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}

export default Seo;
