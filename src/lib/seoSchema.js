/* Générateurs de données structurées (schema.org).

   `Seo` sérialise tel quel ce qu'on lui passe : un tableau produit donc
   plusieurs schémas dans un seul <script>, ce que Google accepte. */

const ORIGIN = (process.env.appUrl || "https://paulzannou.com").replace(/\/+$/, "");

/* Fil d'Ariane : Google remplace l'URL brute du résultat par un chemin lisible.
   `trail` = [{ name, path }], la page courante en dernier. */
export function breadcrumbLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${ORIGIN}${step.path}`,
    })),
  };
}

/* FAQPage. Google exige que les questions soient VISIBLES sur la page :
   ce schéma doit toujours accompagner un vrai bloc de contenu, jamais le
   remplacer. `items` = [{ q, a }]. */
export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
