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
const publications = read("_pages/publications.md");
const cv = read("_data/cv.yml");
const workflows = [".github/workflows/deploy.yml", ".github/workflows/quality.yml"].map(read);

requireMatch(config, /^external_sources: \[\]$/m, "Template external posts must stay disabled.");
requireMatch(config, /^search_enabled: false$/m, "Global search should stay disabled for this three-page site.");
requireMatch(config, /^footer_fixed: false$/m, "The footer must not obscure page content.");
requireMatch(config, /^serve_og_meta: true\b/m, "Open Graph metadata must stay enabled.");
requireMatch(config, /^serve_schema_org: true\b/m, "Schema.org metadata must stay enabled.");
requireMatch(home, /13 peer-reviewed journal articles/, "The homepage publication count is missing from the prose.");
requireMatch(home, /5 granted Chinese invention patents/, "The homepage patent count is missing from the prose.");
if (/class="home-stat/.test(home)) throw new Error("Homepage metrics must remain in prose, not cards.");
requireMatch(language, /include site_enhancements\.liquid/, "Shared site enhancements are not wired in.");
requireMatch(enhancements, /max-height: none !important/, "Publication abstracts must remain expanded.");
requireMatch(enhancements, /text-align: left !important/, "Publication abstracts must remain left aligned.");
requireMatch(enhancements, /border-bottom: 1px solid var\(--site-border\)/, "Publication separators are missing.");
requireMatch(enhancements, /grid-template-columns: 144px minmax\(0, 1fr\)/, "Publication rows lost their consistent grid.");
requireMatch(enhancements, /--global-theme-color: #b55432/, "The warm terracotta palette is missing.");
requireMatch(enhancements, /position: static;[\s\S]*?flex-wrap: wrap !important;[\s\S]*?overflow: visible;/, "CV navigation must wrap without a scrolling bar.");
if (/\.cv-nav a \{[\s\S]*?background: var\(--site-surface\)/.test(enhancements)) throw new Error("CV navigation links must not look like cards.");
requireMatch(publications, /bibliography --query @\*\[author_type=first\]/, "First-author publications are missing.");
requireMatch(publications, /bibliography --query @\*\[author_type=co\]/, "Co-authored publications are missing.");
requireMatch(cv, /date_zh: "2025\.10"/, "Quoted Chinese October date regressed.");

for (const workflow of workflows) {
  for (const line of workflow.split("\n").filter((entry) => entry.trim().startsWith("uses:"))) {
    requireMatch(line, /@[0-9a-f]{40}(?:\s|$)/, `Action is not pinned to a commit SHA: ${line.trim()}`);
  }
}

console.log("Style and content contracts passed.");
