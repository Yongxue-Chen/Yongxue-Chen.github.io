const { test, expect } = require("@playwright/test");

test("homepage has clear identity and prose research summary", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".post-header .post-title")).toHaveText("Yongxue Chen");
  await expect(page.locator(".home-stat")).toHaveCount(0);
  await expect(page.locator("article .lang-en").first()).toContainText("14 peer-reviewed journal articles");
  await expect(page.locator("article .lang-en").first()).toContainText("5 granted Chinese invention patents");
  await expect(page.locator(".profile img")).toHaveAttribute("alt", /Yongxue Chen|prof_pic/i);
  await expect(page.locator(".home-education .edu-item")).toHaveCount(3);
  await expect(page.locator(".home-education .edu-school")).toHaveCount(6);
  await expect(page.locator(".home-section h3 .lang-en").nth(1)).toHaveText("Selected Publications");
  await expect(page.locator(".home-section h3 .lang-en").nth(2)).toHaveText("Selected Awards");
  await expect(page.locator(".home-intro.lang-en")).toContainText("robotics");
  await expect(page.locator(".home-intro.lang-en")).toContainText("advanced manufacturing");
  await expect(page.locator(".home-intro.lang-en")).toContainText("hybrid additive-subtractive manufacturing");
  const profileEmphasisStyle = await page.locator(".home-intro.lang-en strong").first().evaluate((node) => getComputedStyle(node));
  expect(Number(profileEmphasisStyle.fontWeight)).toBeGreaterThanOrEqual(700);
  expect(profileEmphasisStyle.backgroundImage).not.toBe("none");
});

test("publications use one consistent collapsible layout", async ({ page }) => {
  await page.goto("/publications/");
  await expect(page.locator(".post-header .desc")).toHaveCount(0);
  const entries = page.locator(".publications ol.bibliography li");
  await expect(entries).toHaveCount(14);
  const abstracts = page.locator(".publications .abstract.hidden");
  await expect(abstracts).toHaveCount(13);
  for (const abstract of await abstracts.all()) await expect(abstract).toBeHidden();
  await expect(page.locator(".links a.abstract.btn")).toHaveCount(13);
  await expect(page.locator(".links a.abstract.btn .lang-en").first()).toHaveText("Abstract");
  const publicationPreviewRatio = await page.locator(".publications img.preview").first().evaluate((image) => {
    const box = image.getBoundingClientRect();
    return box.width / box.height;
  });
  expect(publicationPreviewRatio).toBeCloseTo(4 / 3, 2);

  const styles = await entries.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return [style.paddingTop, style.paddingBottom, style.borderBottomStyle, style.borderBottomWidth];
    })
  );
  expect(new Set(styles.map((style) => style.join("|"))).size).toBe(1);
});

test("projects use the requested card rows and embedded videos", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.locator(".post-header .desc")).toHaveCount(0);
  await expect(page.locator(".project-section")).toHaveCount(4);
  await expect(page.locator(".project-card")).toHaveCount(8);
  await expect(page.locator(".project-video-trigger")).toHaveCount(2);
  await expect(page.locator(".project-media iframe")).toHaveCount(0);
  await page.locator(".project-video-trigger").first().click();
  await expect(page.locator(".project-media iframe")).toHaveCount(1);
  await expect(page.locator(".project-meta")).toHaveCount(8);
  await expect(page.locator(".project-card").first().locator(".project-meta .lang-en")).toHaveText("ACM TOG (Conditionally Accepted)The University of Manchester");
  const projectMediaRatio = await page.locator(".project-media").first().evaluate((media) => {
    const box = media.getBoundingClientRect();
    return box.width / box.height;
  });
  expect(projectMediaRatio).toBeCloseTo(4 / 3, 2);
  const projectHeaderMargin = await page.locator(".post-header").evaluate((node) => getComputedStyle(node).marginBottom);
  expect(projectHeaderMargin).toBe("48px");
  const columns = await page
    .locator(".project-grid")
    .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length));
  expect(columns).toEqual([2, 3, 2, 1]);
  const singleWidthRatio = await page.locator(".project-grid--single").evaluate((grid) => {
    const card = grid.querySelector(".project-card");
    return card.getBoundingClientRect().width / grid.getBoundingClientRect().width;
  });
  expect(singleWidthRatio).toBeGreaterThan(0.48);
  expect(singleWidthRatio).toBeLessThan(0.51);
  const sectionHeadingStyle = await page.locator(".project-section-heading").first().evaluate((node) => getComputedStyle(node));
  expect(sectionHeadingStyle.borderLeftWidth).toBe("4px");
  expect(sectionHeadingStyle.backgroundImage).not.toBe("none");
});

test("CV uses a sticky desktop index and places research experience after education", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/cv/");
  await expect(page.locator(".post-header .desc")).toHaveCount(0);
  const sidebarStyle = await page.locator(".cv-sidebar").evaluate((node) => getComputedStyle(node));
  expect(sidebarStyle.position).toBe("sticky");
  await expect(page.locator(".cv-contact-links a")).toHaveCount(3);
  await expect(page.locator(".cv-contact-links a").nth(0)).toHaveAttribute("href", "mailto:chandler.yx.chen@gmail.com");
  await expect(page.locator(".cv-contact-links a").nth(1)).toHaveAttribute("href", /scholar\.google\.com/);
  await expect(page.locator(".cv-contact-links a").nth(2)).toHaveAttribute("href", /linkedin\.com/);
  expect(await page.locator(".cv-contact").evaluate((node) => getComputedStyle(node).display)).toBe("block");
  expect(await page.locator(".cv-nav-title").evaluate((node) => getComputedStyle(node).display)).toBe("block");
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
  await expect(page.locator("#research-experience + .cv-section .cv-section-note .lang-en").first()).toHaveText("Selected research themes.");
  await expect(page.locator("#journal-articles + .cv-section .cv-section-note .lang-en").first()).toHaveText("Complete publication list.");
  await expect(page.locator("h2#selected-awards")).toHaveCount(1);
  await expect(page.locator(".cv-section-note a[href=\"/publications/\"]")).toHaveCount(1);
  await expect(page.locator(".cv-section-note a[href=\"/projects/\"]")).toHaveCount(1);
  const cvCtaStyle = await page.locator(".cv-section-note a").first().evaluate((node) => getComputedStyle(node));
  expect(cvCtaStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(cvCtaStyle.color).toBe("rgb(255, 255, 255)");
  const cvCtaTextColor = await page.locator(".cv-section-note a span").first().evaluate((node) => getComputedStyle(node).color);
  expect(cvCtaTextColor).toBe("rgb(255, 255, 255)");
  await expect(page.locator("#journal-articles + .cv-section .cv-entry")).toHaveCount(14);
  await expect(page.locator("#research-experience + .cv-section .cv-entry")).toHaveCount(4);
  await expect(page.locator("#research-experience + .cv-section .cv-entry").nth(0).locator("ul.lang-en li")).toHaveCount(2);
  await expect(page.locator("#research-experience + .cv-section .cv-entry").nth(1).locator("ul.lang-en li")).toHaveCount(3);
  await expect(page.locator("#research-experience + .cv-section .cv-entry").nth(2).locator("ul.lang-en li")).toHaveCount(2);
  await expect(page.locator("#research-experience + .cv-section .cv-entry").nth(3).locator("ul.lang-en li")).toHaveCount(1);
  await expect(page.locator(".cv-nav a.active")).toHaveAttribute("href", "#education");
  await page.locator("#research-experience").evaluate((node) => node.scrollIntoView());
  await expect(page.locator(".cv-nav a.active")).toHaveAttribute("href", "#research-experience");

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator(".cv-contact").evaluate((node) => getComputedStyle(node).display)).toBe("none");
  expect(await page.locator(".cv-nav-title").evaluate((node) => getComputedStyle(node).display)).toBe("none");
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
  await expect(page.locator(".links a.abstract.btn .lang-zh").first()).toHaveText("摘要");
  await expect(page.locator('a.nav-link[href="/projects/"]')).toContainText("项目");
  await expect(page.locator('a.nav-link[href="/cv/"]')).toContainText("简历");
  await expect(page.locator('a.nav-link[href="/life/"]')).toContainText("生活");
});

test("primary pages do not overflow a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/projects/", "/publications/", "/cv/", "/life/"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("Life page provides four simple, responsive personal photo slots", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/life/");
  await expect(page.locator(".post-header .desc")).toHaveCount(0);
  await expect(page.locator(".life-section")).toHaveCount(0);
  await expect(page.locator(".life-photo")).toHaveCount(4);
  await expect(page.locator(".life-placeholder")).toHaveCount(0);
  await expect(page.locator(".life-photo img")).toHaveCount(4);
  await expect(page.locator(".life-photo--hiking")).toHaveCount(2);
  await expect(page.locator(".life-photo--diving")).toHaveCount(1);
  await expect(page.locator(".life-photo--drumming")).toHaveCount(1);
  await expect(page.locator(".life-page figcaption")).toHaveCount(0);
  const desktopColumns = await page.locator(".life-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length);
  expect(desktopColumns).toBe(12);
  const hikingTops = await page.locator(".life-photo--hiking").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
  expect(hikingTops[1] - hikingTops[0]).toBeGreaterThan(30);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileColumns = await page.locator(".life-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length);
  expect(mobileColumns).toBe(1);
});
