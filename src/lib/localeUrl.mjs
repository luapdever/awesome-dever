export function localizedPath(path = "/", locale = "fr") {
  const value = path || "/";
  const suffixAt = value.search(/[?#]/);
  const suffix = suffixAt < 0 ? "" : value.slice(suffixAt);
  const pathname = (suffixAt < 0 ? value : value.slice(0, suffixAt))
    .replace(/^\/(?:en|fr)(?=\/|$)/, "")
    .replace(/\/+$/, "") || "/";
  return `${locale === "en" ? "/en" : ""}${pathname === "/" && locale === "en" ? "" : pathname}${suffix}`;
}
