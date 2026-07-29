---
layout: page
permalink: /projects/
title: Projects
description: Selected research projects in hybrid manufacturing, robotic machining, geometric modeling, and trajectory planning.
nav: true
nav_order: 2
---

{% include lang_toggle.liquid %}

<style>
  .projects-page { --project-gap: 1.15rem; margin-top: 0.2rem; }
  .project-section { margin-top: 3.5rem; }
  .project-section:first-child { margin-top: 0.4rem; }
  .project-section-heading {
    display: flex; align-items: baseline; gap: 0.8rem;
    margin: 0 0 1rem; padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--site-border);
  }
  .project-section-index {
    color: var(--global-theme-color); font-size: 0.78rem;
    font-weight: 760; letter-spacing: 0.1em;
  }
  .project-section-heading h2 { margin: 0; font-size: 1.38rem; line-height: 1.3; }
  .project-grid { display: grid; gap: var(--project-gap); }
  .project-grid--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .project-grid--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .project-grid--single { grid-template-columns: minmax(0, calc((100% - 2 * var(--project-gap)) / 3)); }
  .project-card {
    display: flex; min-width: 0; flex-direction: column; overflow: hidden;
    border: 1px solid var(--site-border); border-radius: 16px;
    background: color-mix(in srgb, var(--global-bg-color) 88%, var(--site-surface));
    box-shadow: 0 12px 30px rgba(47, 91, 118, 0.08);
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .project-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--global-theme-color) 42%, var(--site-border));
    box-shadow: 0 16px 36px rgba(47, 91, 118, 0.13);
  }
  .project-media {
    position: relative; aspect-ratio: 16 / 9; overflow: hidden;
    border-bottom: 1px solid var(--site-border); background: var(--site-accent-soft);
  }
  .project-media img, .project-media iframe { display: block; width: 100%; height: 100%; border: 0; }
  .project-media img { object-fit: cover; }
  .project-media img.project-media-contain { padding: 0.6rem; object-fit: contain; }
  .project-body { display: flex; flex: 1; flex-direction: column; padding: 1rem 1.05rem 1.1rem; }
  .project-meta {
    margin-bottom: 0.45rem; color: var(--global-theme-color);
    font-size: 0.7rem; font-weight: 740; letter-spacing: 0.075em; text-transform: uppercase;
  }
  .project-title {
    margin: 0 0 0.55rem; font-size: 1.03rem; font-weight: 690;
    line-height: 1.38; letter-spacing: -0.018em;
  }
  html[data-lang="zh"] .project-title { letter-spacing: 0.025em; }
  .project-summary {
    margin: 0 0 1rem; color: var(--global-text-color-light);
    font-size: 0.88rem; line-height: 1.58;
  }
  .project-links { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: auto; }
  .project-links a {
    display: inline-flex; align-items: center; min-height: 2rem;
    padding: 0.32rem 0.68rem; border: 1px solid var(--site-border);
    border-radius: 999px; background: var(--site-surface); color: var(--global-text-color);
    font-size: 0.76rem; font-weight: 640; line-height: 1; text-decoration: none;
  }
  .project-links a:first-child {
    border-color: color-mix(in srgb, var(--global-theme-color) 36%, var(--site-border));
    color: var(--global-theme-color);
  }
  .project-links a:hover {
    border-color: var(--global-theme-color); color: var(--global-theme-color); text-decoration: none;
  }
  @media (max-width: 900px) {
    .project-grid--three { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .project-grid--single { grid-template-columns: minmax(0, calc((100% - var(--project-gap)) / 2)); }
  }
  @media (max-width: 640px) {
    .project-section { margin-top: 2.8rem; }
    .project-grid--two, .project-grid--three, .project-grid--single { grid-template-columns: minmax(0, 1fr); }
    .project-section-heading { align-items: flex-start; }
    .project-section-heading h2 { font-size: 1.2rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .project-card { transition: none; }
    .project-card:hover { transform: none; }
  }
</style>

<div class="projects-page">
{% for section in site.data.projects.sections %}
  <section class="project-section" aria-labelledby="projects-{{ section.number }}">
    <div class="project-section-heading">
      <span class="project-section-index">{{ section.number }}</span>
      <h2 id="projects-{{ section.number }}"><span class="lang-en">{{ section.title_en }}</span><span class="lang-zh">{{ section.title_zh }}</span></h2>
    </div>
    <div class="project-grid project-grid--{{ section.layout }}">
    {% for project in section.projects %}
      <article class="project-card">
        <div class="project-media">
        {% if project.media_type == "video" %}
          <iframe src="https://www.youtube-nocookie.com/embed/{{ project.video_id }}" title="{{ project.alt }}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        {% else %}
          <img{% if project.media_class %} class="{{ project.media_class }}"{% endif %} src="{{ project.media | relative_url }}" alt="{{ project.alt }}" loading="lazy">
        {% endif %}
        </div>
        <div class="project-body">
          <div class="project-meta"><span class="lang-en">{{ project.meta_en }}</span><span class="lang-zh">{{ project.meta_zh }}</span></div>
          <h3 class="project-title"><span class="lang-en">{{ project.title_en }}</span><span class="lang-zh">{{ project.title_zh }}</span></h3>
          <p class="project-summary lang-en">{{ project.summary_en }}</p>
          <p class="project-summary lang-zh">{{ project.summary_zh }}</p>
          <div class="project-links">
          {% for link in project.links %}
            <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer"><span class="lang-en">{{ link.label_en }}</span><span class="lang-zh">{{ link.label_zh }}</span></a>
          {% endfor %}
          </div>
        </div>
      </article>
    {% endfor %}
    </div>
  </section>
{% endfor %}
</div>
