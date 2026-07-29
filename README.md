# Yongxue Chen — Academic Homepage

Personal academic website for **Yongxue Chen**, a PhD candidate at The University of Manchester working on robotics, advanced manufacturing, motion planning, trajectory optimization, and computational process planning.

- Website: https://yongxue-chen.github.io/
- Projects: https://yongxue-chen.github.io/projects/
- Publications: https://yongxue-chen.github.io/publications/
- CV: https://yongxue-chen.github.io/cv/

## Local development

```bash
bundle install
npm ci
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000`.

## Updating the Projects page

Project sections, cards, text, media, and links are maintained in `_data/projects.yml`. Do not edit `_site/`; it is regenerated during every build.

- Reorder cards by moving their YAML blocks within a section.
- Use `layout: two`, `three`, or `single` to control the desktop columns for a section.
- Edit `title_en` / `title_zh` and `summary_en` / `summary_zh` for bilingual card copy. For published work, format `meta_en` / `meta_zh` as the standard journal abbreviation and year. For unpublished work, use a short status such as `Under Review` / `审稿中`.
- Edit entries under `links` to change Project, Paper, Code, or Video destinations.
- For an image card, use `media_type: "image"` and set `media` to an image under `assets/img/project_preview/` or `assets/img/publication_preview/`. Prepare both Project and Publication preview images at a consistent 4:3 ratio; 1200 × 900 px is recommended and 800 × 600 px is the practical minimum. Add `media_class: "project-media-contain"` when the full image should remain visible rather than be cropped.
- To replace an image, copy the new file into one of those folders and update the `media` path. Reusing the same filename also works, but a hard refresh may be needed to clear the browser cache.
- For the video card, use `media_type: "video"`, set `video_id` to the YouTube ID only, and set `poster` to a clean 4:3 preview image shown before playback.

Example image card:

```yaml
- media_type: "image"
  media: "/assets/img/project_preview/example.jpg"
  alt: "Short accessible description"
  meta_en: "Journal Abbreviation · 2026"
  meta_zh: "Journal Abbreviation · 2026"
  title_en: "English title"
  title_zh: "中文标题"
  summary_en: "Short English summary."
  summary_zh: "简短中文介绍。"
  links:
    - label_en: "Paper"
      label_zh: "文章"
      url: "https://doi.org/..."
```

## Validation

```bash
bundle exec jekyll build
npm run lint:style-contract
python3 scripts/check_site.py _site
npx playwright install chromium
npm run test:visual
```

## Deployment

Pushes to `master` are built by GitHub Actions and deployed to the `gh-pages` branch. Pull requests run the same build plus source, generated-site, desktop, and mobile layout checks without publishing.

## License

Site source is available under the [MIT License](LICENSE). Personal text, portrait, publication imagery, and research materials remain the property of their respective copyright holders.
