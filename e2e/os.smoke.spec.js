// @ts-check
const { test, expect } = require("@playwright/test");

/* Smoke tests de PaulBrain OS : boot, ouverture d'une app, recherche (Ctrl+B),
   présence du bot. Sélecteurs par TEXTE/ROLE (robustes aux classes CSS-Modules
   hashées). Objectif : attraper les régressions de rendu de l'OS. */
test.describe("PaulBrain OS — smoke", () => {
  test("boots and shows the top menu bar", async ({ page }) => {
    await page.goto("/paulfolio");
    // Le splash de boot laisse place au bureau ; le nom de l'OS est dans la barre.
    await expect(page.getByText("PaulBrain OS").first()).toBeVisible();
  });

  test("opens an app into a window (Beacon → AppDetail)", async ({ page }) => {
    await page.goto("/paulfolio");
    await page.getByText("Beacon", { exact: true }).first().dblclick();
    // La carte AppDetail affiche la catégorie Electron.
    await expect(
      page.getByText(/Electron — internal broadcast|Electron — diffusion interne/i)
    ).toBeVisible();
  });

  test("Ctrl+B opens deep search and matches by stack, not just name", async ({ page }) => {
    await page.goto("/paulfolio");
    await expect(page.getByText("PaulBrain OS").first()).toBeVisible();
    await page.keyboard.press("Control+b");
    // Le champ de recherche prend le focus.
    const search = page.locator("input:focus");
    await expect(search).toBeVisible();
    // "flutter" n'est pas dans le NOM d'Emilia → prouve la recherche profonde (stack).
    await search.fill("flutter");
    await expect(page.getByText("Emilia Cross").first()).toBeVisible();
  });

  test("the PaulBot assistant is mounted", async ({ page }) => {
    await page.goto("/paulfolio");
    // Le widget bot est monté en permanence (bulle/lanceur).
    await expect(
      page.locator("[class*='botwidget_launcher'], [class*='botwidget_teaser']").first()
    ).toBeVisible();
  });
});
