---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 4
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
  /* Distinct from the h2 (which carries a bottom rule) but clearly a heading. */
  h3.cv-subheading {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--global-theme-color);
    margin: 1.5rem 0 0.4rem;
    padding-left: 0.6rem;
    border-left: 3px solid var(--global-theme-color);
    line-height: 1.3;
  }
  h3.cv-subheading:first-child { margin-top: 0.35rem; }
  .cv-entry {
    padding: 0.55rem 0;
    border-bottom: 1px solid var(--global-divider-color);
  }
  .cv-entry:last-child,
  .cv-entry:has(+ h3.cv-subheading) { border-bottom: none; }
  /* No wrapping: a title long enough to fill the row was pushing its year onto the
     next line, unlike every other entry. The title shrinks, the year never does. */
  .cv-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: nowrap;
  }
  .cv-entry-title { flex: 1 1 auto; min-width: 0; }
  .cv-entry-date { flex: 0 0 auto; white-space: nowrap; }
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
  .cv-layout { display: block; }
  .cv-content,
  .cv-sidebar { min-width: 0; }
  h2.cv-heading { scroll-margin-top: 6rem; }
  .cv-section-note {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin: 0 0 0.35rem;
    padding: 0.75rem 0 0.9rem;
    border-bottom: 1px solid var(--global-divider-color);
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }
  .cv-section-note p { margin: 0; }
  .cv-section-note a {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    min-height: 2.15rem;
    padding: 0.38rem 0.78rem;
    border: 1px solid var(--global-theme-color);
    border-radius: 999px;
    background: var(--global-theme-color);
    color: #fff !important;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }
  .cv-section-note a span { color: #fff !important; }
  .cv-section-note a:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px color-mix(in srgb, var(--global-theme-color) 24%, transparent);
    text-decoration: none;
  }
  @media (max-width: 576px) {
    .cv-entry-head { flex-direction: column; gap: 0.1rem; }
    .cv-section-note {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.35rem;
    }
  }
  @media (min-width: 992px) {
    .cv-layout {
      display: grid;
      grid-template-columns: minmax(150px, 180px) minmax(0, 1fr);
      gap: 2.5rem;
      align-items: start;
    }
    .cv-sidebar {
      position: sticky;
      top: 6.25rem;
      align-self: start;
    }
    .cv-layout .cv-nav {
      flex-direction: column;
      flex-wrap: nowrap !important;
      gap: 0.12rem !important;
      margin: 0 !important;
      padding: 0 0 0 0.85rem !important;
      border-bottom: 0 !important;
      border-left: 1px solid var(--global-divider-color);
    }
    .cv-layout .cv-nav a {
      margin-left: -0.9rem;
      padding: 0.28rem 0 0.28rem 0.85rem;
      border-left: 2px solid transparent;
      color: var(--global-text-color-light);
      line-height: 1.3;
      text-decoration: none;
    }
    .cv-layout .cv-nav a.active,
    .cv-layout .cv-nav a:hover {
      border-left-color: var(--global-theme-color);
      color: var(--global-theme-color);
    }
    .cv-content h2.cv-heading:first-child { margin-top: 0 !important; }
  }
</style>

<div class="cv-layout">
<aside class="cv-sidebar">
<nav class="cv-nav" aria-label="CV sections">
{% for section in site.data.cv.sections %}<a href="#{{ section.name | slugify }}"><span class="lang-en">{{ section.name }}</span><span class="lang-zh">{{ section.name_zh | default: section.name }}</span></a>{% endfor %}
</nav>
</aside>
<div class="cv-content">

{% for section in site.data.cv.sections %}
<h2 class="cv-heading" id="{{ section.name | slugify }}"><span class="lang-en">{{ section.name }}</span><span class="lang-zh">{{ section.name_zh | default: section.name }}</span></h2>

<div class="cv-section">
{% if section.summary %}
  <div class="cv-section-note">
    <p><span class="lang-en">{{ section.summary }}</span><span class="lang-zh">{{ section.summary_zh | default: section.summary }}</span></p>
    {% if section.more_url %}<a href="{{ section.more_url }}"><span class="lang-en">{{ section.more_label }}</span><span class="lang-zh">{{ section.more_label_zh | default: section.more_label }}</span></a>{% endif %}
  </div>
{% endif %}
{% assign current_group = "" %}
{% for item in section.items %}
  {% if item.group and item.group != current_group %}
    {% assign current_group = item.group %}
    {% assign g_zh = item.group_zh | default: item.group %}
  <h3 class="cv-subheading"><span class="lang-en">{{ item.group }}</span><span class="lang-zh">{{ g_zh }}</span></h3>
  {% endif %}
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
</div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    var links = Array.from(document.querySelectorAll(".cv-nav a"));
    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    });
    function updateActiveSection() {
      var current = sections[0];
      sections.forEach(function (section) {
        if (section && section.getBoundingClientRect().top <= 150) current = section;
      });
      links.forEach(function (link) {
        var active = current && link.getAttribute("href") === "#" + current.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
  });
</script>
