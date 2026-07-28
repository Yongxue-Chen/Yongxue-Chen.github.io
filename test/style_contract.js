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
requireMatch(home, /class="home-stats"/, "The homepage research summary is missing.");
requireMatch(language, /include site_enhancements\.liquid/, "Shared site enhancements are not wired in.");
requireMatch(enhancements, /max-height: none !important/, "Publication abstracts must remain expanded.");
requireMatch(enhancements, /text-align: left !important/, "Publication abstracts must remain left aligned.");
requireMatch(enhancements, /border-bottom: 1px solid var\(--site-border\)/, "Publication separators are missing.");
requireMatch(enhancements, /grid-template-columns: 144px minmax\(0, 1fr\)/, "Publication rows lost their consistent grid.");
requireMatch(publications, /bibliography --query @\*\[author_type=first\]/, "First-author publications are missing.");
requireMatch(publications, /bibliography --query @\*\[author_type=co\]/, "Co-authored publications are missing.");
requireMatch(cv, /date_zh: "2025\.10"/, "Quoted Chinese October date regressed.");

for (const workflow of workflows) {
  for (const line of workflow.split("\n").filter((entry) => entry.trim().startsWith("uses:"))) {
    requireMatch(line, /@[0-9a-f]{40}(?:\s|$)/, `Action is not pinned to a commit SHA: ${line.trim()}`);
  }
}

console.log("Style and content contracts passed.");
