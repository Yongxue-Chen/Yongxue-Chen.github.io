const { test, expect } = require("@playwright/test");

test("homepage has clear identity and prose research summary", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".post-header .post-title")).toHaveText("Yongxue Chen");
  await expect(page.locator(".home-stat")).toHaveCount(0);
  await expect(page.locator("article .lang-en").first()).toContainText("13 peer-reviewed journal articles");
  await expect(page.locator("article .lang-en").first()).toContainText("5 granted Chinese invention patents");
  await expect(page.locator(".profile img")).toHaveAttribute("alt", /Yongxue Chen|prof_pic/i);
});

test("publications use one consistent collapsible layout", async ({ page }) => {
  await page.goto("/publications/");
  const entries = page.locator(".publications ol.bibliography li");
  await expect(entries).toHaveCount(13);
  const abstracts = page.locator(".publications .abstract.hidden");
  await expect(abstracts).toHaveCount(13);
  for (const abstract of await abstracts.all()) await expect(abstract).toBeHidden();

  const styles = await entries.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return [style.paddingTop, style.paddingBottom, style.borderBottomStyle, style.borderBottomWidth];
    })
  );
  expect(new Set(styles.map((style) => style.join("|"))).size).toBe(1);
});

test("projects use the requested card rows and a single embedded video", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.locator(".project-section")).toHaveCount(4);
  await expect(page.locator(".project-card")).toHaveCount(8);
  await expect(page.locator(".project-media iframe")).toHaveCount(1);
  const columns = await page
    .locator(".project-grid")
    .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length));
  expect(columns).toEqual([2, 3, 2, 1]);
});

test("CV uses a sticky desktop index and places research experience after education", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/cv/");
  const sidebarStyle = await page.locator(".cv-sidebar").evaluate((node) => getComputedStyle(node));
  expect(sidebarStyle.position).toBe("sticky");
  const navStyle = await page.locator(".cv-nav").evaluate((node) => getComputedStyle(node));
  expect(navStyle.flexDirection).toBe("column");
  expect(navStyle.flexWrap).toBe("nowrap");
  expect(navStyle.overflowX).toBe("visible");
  const linkStyle = await page.locator(".cv-nav a").first().evaluate((node) => getComputedStyle(node));
  expect(linkStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)");
  expect(linkStyle.borderTopWidth).toBe("0px");
  const headingStyle = await page.locator("h2.cv-heading").first().evaluate((node) => getComputedStyle(node));
  expect(headingStyle.borderLeftWidth).toBe("4px");
  expect(headingStyle.backgroundImage).not.toBe("none");
  await expect(page.locator("h2.cv-heading .lang-en").nth(0)).toHaveText("Education");
  await expect(page.locator("h2.cv-heading .lang-en").nth(1)).toHaveText("Research Experience");
  await expect(page.locator(".cv-section-note")).toHaveCount(2);
  await expect(page.locator(".cv-section-note a[href=\"/publications/\"]")).toHaveCount(1);
  await expect(page.locator(".cv-section-note a[href=\"/projects/\"]")).toHaveCount(1);
  await expect(page.locator("#journal-articles + .cv-section .cv-entry")).toHaveCount(13);
  await expect(page.locator("#research-experience + .cv-section .cv-entry")).toHaveCount(4);
  await expect(page.locator(".cv-nav a.active")).toHaveAttribute("href", "#education");
  await page.locator("#research-experience").evaluate((node) => node.scrollIntoView());
  await expect(page.locator(".cv-nav a.active")).toHaveAttribute("href", "#research-experience");

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileSidebarStyle = await page.locator(".cv-sidebar").evaluate((node) => getComputedStyle(node));
  const mobileNavStyle = await page.locator(".cv-nav").evaluate((node) => getComputedStyle(node));
  expect(mobileSidebarStyle.position).toBe("static");
  expect(mobileNavStyle.flexWrap).toBe("wrap");
});

test("language selection updates document semantics and navigation", async ({ page }) => {
  await page.goto("/publications/");
  await page.getByRole("button", { name: "中文" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator(".post-title")).toHaveText("论文");
  await expect(page.locator('a.nav-link[href="/projects/"]')).toContainText("项目");
  await expect(page.locator('a.nav-link[href="/cv/"]')).toContainText("简历");
});

test("primary pages do not overflow a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/projects/", "/publications/", "/cv/"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
