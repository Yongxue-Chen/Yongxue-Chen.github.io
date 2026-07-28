---
layout: page
permalink: /publications/
title: publications
description: Peer-reviewed journal articles, grouped by authorship and listed in reverse chronological order.
nav: true
nav_order: 2
---

<style>
  /* Abstracts are always shown — no expand/collapse toggle. */
  .publications ol.bibliography li .abstract.hidden,
  .publications ol.bibliography li div.abstract.hidden {
    max-height: none !important;
    overflow: visible !important;
    border: none !important;
    font-size: 0.9rem;
    text-align: justify;
    margin-top: 0.35rem;
  }
  .publications ol.bibliography li .abstract.hidden p {
    margin: 0;
    line-height: 1.5em;
  }
  /* Hide the now-redundant "Abs" toggle button. */
  .publications ol.bibliography li .links a.abstract.btn {
    display: none !important;
  }
  .pub-group-title {
    border-bottom: 2px solid var(--global-theme-color);
    padding-bottom: 0.3rem;
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
  }
  .pub-group-note {
    color: var(--global-text-color-light);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  /* Highlight my own name in the author list. */
  .publications ol.bibliography li .author > em {
    font-weight: 700;
    font-style: normal;
    border-bottom: none;
  }
</style>

{% include bib_search.liquid %}

<div class="publications">

<h2 class="pub-group-title">First-author journal articles</h2>
<p class="pub-group-note">Papers on which I am the first author.</p>

{% bibliography --query @*[author_type=first] %}

<h2 class="pub-group-title">Co-authored journal articles</h2>
<p class="pub-group-note">Collaborative work with colleagues at Manchester and SJTU.</p>

{% bibliography --query @*[author_type=co] %}

</div>
