---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 3
description: Education, publications, patents, teaching, awards, and research experience.
---

{% include lang_toggle.liquid %}

<style>
  .cv-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.9rem;
    padding-bottom: 0.9rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--global-divider-color);
    font-size: 0.85rem;
  }
  .cv-section { margin-bottom: 2rem; }
  h2.cv-heading {
    font-size: 1.45rem;
    margin-top: 2rem;
    margin-bottom: 0.6rem;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid var(--global-theme-color);
  }
  .cv-entry {
    padding: 0.55rem 0;
    border-bottom: 1px solid var(--global-divider-color);
  }
  .cv-entry:last-child { border-bottom: none; }
  .cv-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .cv-entry-title { font-weight: 600; }
  .cv-entry-title a { color: var(--global-text-color); }
  .cv-entry-title a:hover { color: var(--global-theme-color); text-decoration: none; }
  .cv-entry-date {
    color: var(--global-text-color-light);
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cv-entry-sub {
    font-size: 0.92rem;
    color: var(--global-text-color-light);
    margin-top: 0.15rem;
  }
  .cv-entry-sub strong { color: var(--global-text-color); }
  .cv-entry ul {
    margin: 0.35rem 0 0 0;
    padding-left: 1.1rem;
    font-size: 0.9rem;
  }
  .cv-entry ul li { margin-bottom: 0.15rem; }
  @media (max-width: 576px) {
    .cv-entry-head { flex-direction: column; gap: 0.1rem; }
  }
</style>

<nav class="cv-nav">
{% for section in site.data.cv.sections %}<a href="#{{ section.name | slugify }}"><span class="lang-en">{{ section.name }}</span><span class="lang-zh">{{ section.name_zh | default: section.name }}</span></a>{% endfor %}
</nav>

{% for section in site.data.cv.sections %}
<h2 class="cv-heading" id="{{ section.name | slugify }}"><span class="lang-en">{{ section.name }}</span><span class="lang-zh">{{ section.name_zh | default: section.name }}</span></h2>

<div class="cv-section">
{% for item in section.items %}
  {% assign t_zh = item.title_zh | default: item.title %}
  {% assign s_zh = item.subtitle_zh | default: item.subtitle %}
  {% assign d_zh = item.date_zh | default: item.date %}
  <div class="cv-entry">
    <div class="cv-entry-head">
      <span class="cv-entry-title">{% if item.url %}<a href="{{ item.url }}"><span class="lang-en">{{ item.title }}</span><span class="lang-zh">{{ t_zh }}</span></a>{% else %}<span class="lang-en">{{ item.title }}</span><span class="lang-zh">{{ t_zh }}</span>{% endif %}</span>
      {% if item.date %}<span class="cv-entry-date"><span class="lang-en">{{ item.date }}</span><span class="lang-zh">{{ d_zh }}</span></span>{% endif %}
    </div>
    {% if item.subtitle %}<div class="cv-entry-sub"><span class="lang-en">{{ item.subtitle }}</span><span class="lang-zh">{{ s_zh }}</span></div>{% endif %}
    {% if item.details %}
    <ul class="lang-en">
      {% for d in item.details %}<li>{{ d }}</li>{% endfor %}
    </ul>
    {% endif %}
    {% if item.details_zh %}
    <ul class="lang-zh">
      {% for d in item.details_zh %}<li>{{ d }}</li>{% endfor %}
    </ul>
    {% elsif item.details %}
    <ul class="lang-zh">
      {% for d in item.details %}<li>{{ d }}</li>{% endfor %}
    </ul>
    {% endif %}
  </div>
{% endfor %}
</div>

{% endfor %}
