/* Préfixe un lien INTERNE par la locale courante.

   `<Link>` de Next le fait tout seul ; un `<a>` brut non. Les listes de liens
   définies en données (rawDatas) sont rendues en `<a>` : sans ce helper, la
   version anglaise renvoyait vers les pages françaises. */

const ORIGIN = "https://paulzannou.com";

/* `/cv` est une app STATIQUE servie par rewrite : elle n'a pas de variante de
   locale et `/en/cv` renvoie 404. La préfixer casserait le lien. */
const NO_LOCALE = new Set(["/cv"]);

export function localeHref(href, lang) {
  if (!href) return href;
  // Une URL absolue vers le site est ramenée à un chemin, donc préfixable —
  // et elle cesse de renvoyer en production depuis un environnement local.
  const path = href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) || "/" : href;
  if (!path.startsWith("/")) return href; // externe, mailto:, tel:…
  if (lang !== "en" || NO_LOCALE.has(path)) return path;
  return `/en${path}`;
}
