/* BM25 en JavaScript pur : mot rare pondéré plus fort (IDF), répétition à
   rendements décroissants (k1), document court favorisé (b).
   Pas de SQLite/FTS5 ici — 1 Mo de WASM pour 170 Ko de contenu tenant en
   mémoire n'aurait aucun sens. On garde l'algorithme, pas le moteur. */

const K1 = 1.2;
const B = 0.75;

const STOP = new Set(["le", "la", "les", "de", "des", "du", "un", "une", "et", "en", "the", "a", "an", "of", "to", "is", "for", "with"]);

/** Minuscules, sans accents, mots de 2 lettres minimum, hors mots vides. */
export function terms(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w.length >= 2 && !STOP.has(w));
}

/** Index du corpus. À mémoriser : indépendant de la requête. */
export function buildIndex(docs) {
  const tf = [];
  const len = [];
  const df = new Map();
  for (const d of docs) {
    const ts = terms(d);
    const m = new Map();
    for (const t of ts) m.set(t, (m.get(t) || 0) + 1);
    for (const t of m.keys()) df.set(t, (df.get(t) || 0) + 1);
    tf.push(m);
    len.push(ts.length);
  }
  const total = len.reduce((a, b) => a + b, 0);
  return { n: docs.length, avgdl: docs.length ? total / docs.length : 0, df, tf, len };
}

/** Score du document `i`. Non borné : sert à comparer, pas à afficher. */
export function score(idx, queryTerms, i) {
  if (!queryTerms.length || !idx.n) return 0;
  const tf = idx.tf[i];
  const dl = idx.len[i] || 0;
  let s = 0;
  for (const t of queryTerms) {
    const f = tf.get(t);
    if (!f) continue;
    const df = idx.df.get(t) || 0;
    const idf = Math.log(1 + (idx.n - df + 0.5) / (df + 0.5));
    s += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * dl) / (idx.avgdl || 1))));
  }
  return s;
}

/* Trie par pertinence. `requireAll` conserve le filtrage strict existant :
   seul l'ordre change, aucun résultat n'apparaît ni ne disparaît. */
export function rank(items, idx, query, { requireAll = true } = {}) {
  const qt = terms(query);
  if (!qt.length) return items;
  const out = [];
  for (let i = 0; i < items.length; i++) {
    const tf = idx.tf[i];
    if (requireAll && !qt.every((t) => tf.has(t))) continue;
    const s = score(idx, qt, i);
    if (!requireAll && s <= 0) continue;
    out.push({ item: items[i], s });
  }
  return out.sort((a, b) => b.s - a.s).map((x) => x.item);
}
