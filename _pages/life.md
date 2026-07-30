---
layout: page
permalink: /life/
title: Life
nav: true
nav_order: 5
---

{% include lang_toggle.liquid %}

<style>
  .life-intro {
    max-width: 34rem;
    margin: 0 0 4.5rem;
    color: var(--global-text-color-light);
    font-size: 1.02rem;
    line-height: 1.75;
  }
  .life-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 3rem 2rem;
    align-items: start;
    padding-bottom: 3rem;
  }
  .life-photo {
    min-width: 0;
    margin: 0;
  }
  .life-photo:nth-child(1) { grid-column: 1 / span 7; }
  .life-photo:nth-child(2) {
    grid-column: 9 / span 4;
    margin-top: 2rem;
  }
  .life-photo:nth-child(3) {
    grid-column: 2 / span 3;
    margin-top: -2rem;
  }
  .life-photo:nth-child(4) {
    grid-column: 7 / span 6;
    margin-top: 0;
  }
  .life-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 1.15rem;
    background: #eaf2f6;
    box-shadow: 0 16px 38px rgba(47, 91, 118, 0.1);
  }
  .life-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .life-photo:hover .life-media img { transform: scale(1.025); }
  .life-placeholder {
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    color: color-mix(in srgb, var(--global-theme-color) 68%, #314b5a);
  }
  .life-photo--hiking .life-placeholder { background: linear-gradient(145deg, #eef5ee, #dce9e2); }
  .life-photo--diving .life-placeholder { background: linear-gradient(145deg, #e9f5f8, #d5e9f1); }
  .life-photo--drumming .life-placeholder { background: linear-gradient(145deg, #f3eee9, #e4dcd5); }
  .life-placeholder i { font-size: 1.75rem; }
  @media (max-width: 800px) {
    .life-intro { margin-bottom: 2.5rem; }
    .life-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .life-photo:nth-child(1),
    .life-photo:nth-child(2),
    .life-photo:nth-child(3),
    .life-photo:nth-child(4) {
      grid-column: 1;
      margin-top: 0;
    }
    .life-photo:nth-child(3) {
      width: 72%;
      justify-self: center;
    }
  }
</style>

<div class="life-page">
  <p class="life-intro lang-en">A few moments beyond research.</p>
  <p class="life-intro lang-zh">科研之外的一些片段。</p>

  <div class="life-grid">
    {% for photo in site.data.life.photos %}
    <figure class="life-photo life-photo--{{ photo.type }}">
      <div class="life-media" style="aspect-ratio: {{ photo.ratio | default: '4 / 3' }};">
        {% if photo.image != "" %}
        <img src="{{ photo.image }}" alt="{% if photo.alt_en %}{{ photo.alt_en }}{% else %}Personal photograph{% endif %}" loading="lazy" data-zoomable style="object-position: {{ photo.position | default: 'center' }};">
        {% else %}
        <div class="life-placeholder" aria-label="Photo placeholder">
          {% if photo.type == "hiking" %}<i class="fa-solid fa-mountain-sun" aria-hidden="true"></i>{% elsif photo.type == "diving" %}<i class="fa-solid fa-water" aria-hidden="true"></i>{% else %}<i class="fa-solid fa-drum" aria-hidden="true"></i>{% endif %}
        </div>
        {% endif %}
      </div>
    </figure>
    {% endfor %}
  </div>
</div>
