const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("dever_experience", "classic");
    localStorage.setItem("cookie_consent", "denied");
  });
});

test("English metadata and canonical are delivered without JavaScript", async ({ request }) => {
  const response = await request.get("/en");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Full-Stack Software Engineer");
  expect(html).toContain('rel="canonical" href="https://paulzannou.com/en"');
  expect(html).not.toContain('href="https://paulzannou.com/en/"');
  const about = await (await request.get("/en/about-me")).text();
  expect(about).toContain("About | Paul");
  expect(about).toContain('"inLanguage":"en"');
  expect(about).toContain('"name":"Is Paul available for a mission?"');
  expect(about).not.toContain('"name":"Paul est-il disponible pour une mission ?"');
});

test("language switch keeps query, hash and reading position", async ({ page }) => {
  await page.goto("/about-me?source=test#faq-title");
  await expect(page.getByRole("link", { name: "English version", exact: true })).toHaveAttribute("href", "/en/about-me?source=test#faq-title");
  const title = page.locator("#faq-title");
  await title.scrollIntoViewIfNeeded();
  const before = await title.boundingBox();
  await page.getByRole("link", { name: "English version", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about-me\?source=test#faq-title$/);
  await expect(title).toHaveText("Frequently asked questions");
  await expect(page.locator("[data-language]" )).toHaveAttribute("aria-busy", "false");
  const after = await title.boundingBox();
  expect(Math.abs(after.y - before.y)).toBeLessThan(8);
  await expect(page.getByRole("link", { name: "Version française", exact: true })).toHaveAttribute("href", "/about-me?source=test#faq-title");
  await page.goBack();
  await expect(title).toHaveText("Questions fréquentes");
});

test("the hero stays visible and the preloader is not replayed on translation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#preloader")).not.toBeInViewport({ timeout: 10000 });
  await page.getByRole("link", { name: "English version", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build");
  await expect(page.locator("#preloader")).not.toBeInViewport();
  await expect(page.locator("[data-language]")).toHaveAttribute("data-language", "en");
});

test("reduced-motion disables the selector transition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about-me");
  await page.getByRole("link", { name: "English version", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about-me$/);
  await expect(page.locator("[data-language]")).toHaveAttribute("aria-busy", "false");
  const duration = await page.locator("[class*='langIndicator']").evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(duration).toBe("0s");
});

test("public project pages keep Celtiis disclosures bounded", async ({ page, request }) => {
  for (const slug of ["celtiis", "celtiis-business", "celtiis-club-presse", "emilia-cross", "my-mtn-selfcare", "mtn-benin", "yello-market", "yello-connect", "mon-routeur"]) {
    for (const prefix of ["", "/en"]) {
      expect((await request.get(`${prefix}/projects/${slug}`)).status()).toBe(200);
    }
  }
  await page.goto("/en/projects/celtiis-business");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Celtiis Business");
  await expect(page.locator("main")).toContainText("via KAMGOKO");
  await expect(page.locator("main")).toContainText(/under NDA|covered by an NDA/);
  await expect(page.locator("main")).not.toContainText("WordPress");
  await expect(page.getByRole("heading", { name: "Documented technologies" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Visit the website" })).toHaveAttribute("href", "https://business.celtiis.bj/");
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
});

test("sitemap contains canonical, reciprocal project URLs", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("<loc>https://paulzannou.com/en</loc>");
  expect(xml).not.toContain("<loc>https://paulzannou.com/en/</loc>");
  expect(xml).not.toContain("https://paulzannou.com/en/cv");
  expect(xml).toContain("<loc>https://paulzannou.com/en/projects/celtiis-business</loc>");
  expect(xml).toContain('hreflang="fr" href="https://paulzannou.com/projects/celtiis-business"');
});

test("mobile language switch remains usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about-me");
  await page.getByRole("link", { name: "English version", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about-me$/);
  await expect(page.locator("[data-language]")).toHaveAttribute("aria-busy", "false");
  await expect(page.getByRole("link", { name: "Version française", exact: true })).toBeInViewport();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});


test("legacy English CV redirects permanently and keeps the English selection", async ({ request }) => {
  const response = await request.get("/en/cv?profile=backend", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  const target = new URL(response.headers().location, "http://localhost");
  expect(target.pathname).toBe("/cv");
  expect(target.searchParams.get("lang")).toBe("en");
  expect(target.searchParams.get("profile")).toBe("backend");
  const cv = await request.get(target.pathname + target.search);
  expect(cv.status()).toBe(200);
  expect(await cv.text()).toContain('_qs.get("lang")');
});

test("reported article and RSS remain crawlable", async ({ request }) => {
  const path = "/blog/ce-portfolio-nouvelle-generation";
  const article = await request.get(path);
  expect(article.status()).toBe(200);
  const html = await article.text();
  expect(html).toContain(`rel="canonical" href="https://paulzannou.com${path}"`);
  expect(html).toContain('content="index, follow,');
  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toMatch(/application\/(?:rss\+)?xml/);
  expect(await feed.text()).toContain(`https://paulzannou.com${path}</link>`);
});
