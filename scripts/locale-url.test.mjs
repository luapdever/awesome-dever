import test from "node:test";
import assert from "node:assert/strict";
import { localizedPath } from "../src/lib/localeUrl.mjs";

for (const [path, locale, expected] of [
  ["/", "en", "/en"], ["/en/", "en", "/en"], ["/en", "fr", "/"],
  ["/about-me", "en", "/en/about-me"], ["/en/about-me", "fr", "/about-me"],
  ["/projects/celtiis-business?source=menu#project-overview", "en", "/en/projects/celtiis-business?source=menu#project-overview"],
  ["/en/projects/celtiis?source=en#project-technologies", "fr", "/projects/celtiis?source=en#project-technologies"],
  ["/en/blog/entry/", "en", "/en/blog/entry"], ["/frontend", "en", "/en/frontend"],
]) {
  test(`${path} → ${locale}`, () => assert.equal(localizedPath(path, locale), expected));
}
