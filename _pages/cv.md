---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 3
description: Education, publications, patents, teaching, awards, and research experience.
toc:
  sidebar: left
---

<style>
  .cv-section { margin-bottom: 2rem; }
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

{% for section in site.data.cv.sections %}

## {{ section.name }}

<div class="cv-section">
{% for item in section.items %}
  <div class="cv-entry">
    <div class="cv-entry-head">
      <span class="cv-entry-title">{% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</span>
      {% if item.date %}<span class="cv-entry-date">{{ item.date }}</span>{% endif %}
    </div>
    {% if item.subtitle %}<div class="cv-entry-sub">{{ item.subtitle }}</div>{% endif %}
    {% if item.details %}
    <ul>
      {% for d in item.details %}<li>{{ d }}</li>{% endfor %}
    </ul>
    {% endif %}
  </div>
{% endfor %}
</div>

{% endfor %}
