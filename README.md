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
