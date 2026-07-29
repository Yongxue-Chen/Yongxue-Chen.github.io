const fs = require("node:fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireMatch(content, pattern, message) {
  if (!pattern.test(content)) throw new Error(message);
}

const config = read("_config.yml");
const enhancements = read("_includes/site_enhancements.liquid");
const language = read("_includes/lang_toggle.liquid");
const home = read("_pages/about.md");
const projectsPage = read("_pages/projects.md");
const projectsData = read("_data/projects.yml");
const publications = read("_pages/publications.md");
const cv = read("_data/cv.yml");
const cvPage = read("_pages/cv.md");
const workflows = [".github/workflows/deploy.yml", ".github/workflows/quality.yml"].map(read);

requireMatch(config, /^external_sources: \[\]$/m, "Template external posts must stay disabled.");
requireMatch(config, /^search_enabled: false$/m, "Global search should stay disabled for this four-page site.");
requireMatch(config, /^footer_fixed: false$/m, "The footer must not obscure page content.");
requireMatch(config, /^serve_og_meta: true\b/m, "Open Graph metadata must stay enabled.");
requireMatch(config, /^serve_schema_org: true\b/m, "Schema.org metadata must stay enabled.");
requireMatch(config, /fonts: "\/assets\/css\/system-fonts\.css"/, "The site must not load unused render-blocking web fonts.");
requireMatch(home, /13 peer-reviewed journal articles/, "The homepage publication count is missing from the prose.");
requireMatch(home, /5 granted Chinese invention patents/, "The homepage patent count is missing from the prose.");
if (/class="home-stat/.test(home)) throw new Error("Homepage metrics must remain in prose, not cards.");
requireMatch(home, /Selected Publications/, "The homepage selected-publications heading is missing.");
requireMatch(home, /Selected Awards/, "The homepage selected-awards heading is missing.");
requireMatch(home, /class="edu-school"/, "Homepage institutions are not emphasized.");
requireMatch(home, /\*\*robotics\*\*/, "Robotics emphasis is missing from the homepage profile.");
requireMatch(home, /\*\*advanced manufacturing\*\*/, "Advanced-manufacturing emphasis is missing from the homepage profile.");
requireMatch(home, /\*\*hybrid additive-subtractive manufacturing\*\*/, "Hybrid-manufacturing emphasis is missing from the homepage profile.");
for (const page of [projectsPage, publications, cvPage]) {
  if (/^description:/m.test(page)) throw new Error("Primary subpages must not show a description below the title.");
}
requireMatch(language, /include site_enhancements\.liquid/, "Shared site enhancements are not wired in.");
requireMatch(enhancements, /theme's `max-height: 0`/, "Publication abstracts must remain collapsed by default.");
requireMatch(enhancements, /text-align: left !important/, "Publication abstracts must remain left aligned.");
requireMatch(enhancements, /border-bottom: 1px solid var\(--site-border\)/, "Publication separators are missing.");
requireMatch(enhancements, /grid-template-columns: 144px minmax\(0, 1fr\)/, "Publication rows lost their consistent grid.");
requireMatch(enhancements, /--global-theme-color: #3f7191/, "The light blue academic palette is missing.");
requireMatch(enhancements, /border-left: 4px solid var\(--global-theme-color\)/, "Homepage section hierarchy is missing.");
requireMatch(enhancements, /html\[data-lang="zh"\] body h1,[\s\S]*?letter-spacing: 0\.045em;/, "Chinese heading spacing is missing.");
requireMatch(
  enhancements,
  /position: static;[\s\S]*?flex-wrap: wrap !important;[\s\S]*?overflow: visible;/,
  "CV navigation must wrap without a scrolling bar."
);
if (/\.cv-nav a \{[\s\S]*?background: var\(--site-surface\)/.test(enhancements)) throw new Error("CV navigation links must not look like cards.");
requireMatch(projectsPage, /project-grid--{{ section\.layout }}/, "Project cards must use the requested row layouts.");
if (!projectsPage.includes(".project-grid--single { grid-template-columns: minmax(0, calc((100% - var(--project-gap)) / 2)); }")) throw new Error("The single Project card must remain half width.");
requireMatch(projectsPage, /project-section-heading[\s\S]*?border-left: 4px solid var\(--global-theme-color\)[\s\S]*?linear-gradient/, "Project section headings need a clear visual hierarchy.");
requireMatch(projectsData, /video_id: "QE_5t5a_qDg"/, "The inverse-planning project video is missing.");
requireMatch(projectsData, /poster: "\/assets\/img\/publication_preview\/SIGAsia2025HybridManu\.jpg"/, "The project video poster is missing.");
requireMatch(projectsPage, /project-video-trigger/, "The clean click-to-play video cover is missing.");
requireMatch(projectsData, /IEEE Transactions on Automation Science and Engineering · 2025/, "Project metadata must use full journal names and years.");
requireMatch(projectsData, /HybridFieldOpt\.png/, "The field-optimization project image is missing.");
requireMatch(projectsData, /meta_en: "Under Review"/, "The first project review status is missing.");
requireMatch(projectsData, /Inverse Operation-Based Planning for Hybrid Manufacturing/, "The inverse-operation project title is missing.");
requireMatch(projectsData, /Trajectory Co-Optimization for Robot-Assisted Manufacturing/, "The trajectory co-optimization section title is missing.");
requireMatch(projectsPage, /project-journal[\s\S]*?white-space: nowrap;/, "Project journal names must remain on one line.");
requireMatch(projectsPage, /post-header \{ margin-bottom: 3rem !important; \}/, "The Projects title needs more space below it.");
requireMatch(projectsPage, /\.project-summary \{[\s\S]*?text-align: justify;/, "Project summaries must remain justified.");
requireMatch(projectsPage, /aspect-ratio: 4 \/ 3;/, "Project images must keep the shared 4:3 preview ratio.");
requireMatch(enhancements, /aspect-ratio: 4 \/ 3;/, "Publication images must keep the shared 4:3 preview ratio.");
if ((projectsData.match(/media_type:/g) || []).length !== 8) throw new Error("The Project page must contain exactly eight cards.");
if ((projectsData.match(/video_id:/g) || []).length !== 1) throw new Error("Only the inverse-planning project should embed a video.");
requireMatch(publications, /bibliography --query @\*\[author_type=first\]/, "First-author publications are missing.");
requireMatch(publications, /bibliography --query @\*\[author_type=co\]/, "Co-authored publications are missing.");
requireMatch(publications, />Abstract<\/span>/, "Publication abstract buttons must use the full label.");
requireMatch(cv, /date_zh: "2025\.10"/, "Quoted Chinese October date regressed.");
requireMatch(cv, /name: Selected Awards/, "CV awards must be labeled as selected.");
requireMatch(cv, /summary: Selected research themes\./, "The concise Projects description is missing from the CV.");
requireMatch(cv, /summary: Complete publication list\./, "The concise Publications description is missing from the CV.");

for (const workflow of workflows) {
  for (const line of workflow.split("\n").filter((entry) => entry.trim().startsWith("uses:"))) {
    requireMatch(line, /@[0-9a-f]{40}(?:\s|$)/, `Action is not pinned to a commit SHA: ${line.trim()}`);
  }
}

console.log("Style and content contracts passed.");
