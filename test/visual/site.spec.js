const { test, expect } = require("@playwright/test");

test("homepage has clear identity and research summary", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-brand")).toHaveText("Yongxue Chen");
  await expect(page.locator(".home-stat")).toHaveCount(3);
  await expect(page.locator(".profile img")).toHaveAttribute("alt", /Yongxue Chen|prof_pic/i);
});

test("publications use one consistent expanded layout", async ({ page }) => {
  await page.goto("/publications/");
  const entries = page.locator(".publications ol.bibliography li");
  await expect(entries).toHaveCount(13);
  const abstracts = page.locator(".publications .abstract.hidden");
  await expect(abstracts).toHaveCount(13);
  for (const abstract of await abstracts.all()) await expect(abstract).toBeVisible();

  const styles = await entries.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return [style.paddingTop, style.paddingBottom, style.borderBottomStyle, style.borderBottomWidth];
    }),
  );
  expect(new Set(styles.map((style) => style.join("|"))).size).toBe(1);
});

test("language selection updates document semantics and navigation", async ({ page }) => {
  await page.goto("/publications/");
  await page.getByRole("button", { name: "中文" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator(".post-title")).toHaveText("论文");
  await expect(page.locator('a.nav-link[href="/cv/"]')).toContainText("简历");
});

test("primary pages do not overflow a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/publications/", "/cv/"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
