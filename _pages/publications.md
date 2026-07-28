---
layout: page
permalink: /publications/
title: publications
description: Peer-reviewed journal articles, grouped by authorship and listed in reverse chronological order.
nav: true
nav_order: 2
---

{% include lang_toggle.liquid %}

<style>
  /* Abstracts are always shown — no expand/collapse toggle. */
  .publications ol.bibliography li .abstract.hidden,
  .publications ol.bibliography li div.abstract.hidden {
    max-height: none !important;
    overflow: visible !important;
    border: none !important;
    font-size: 0.9rem;
    text-align: left;
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
  /* Titles link to the official paper page; keep them looking like titles. */
  .publications ol.bibliography li .title a {
    color: var(--global-text-color);
  }
  .publications ol.bibliography li .title a:hover {
    color: var(--global-theme-color);
    text-decoration: none;
  }
</style>

{% include bib_search.liquid %}

<div class="publications">

<h2 class="pub-group-title"><span class="lang-en">First-author journal articles</span><span class="lang-zh">第一作者期刊论文</span></h2>
<p class="pub-group-note"><span class="lang-en">Papers on which I am the first author.</span><span class="lang-zh">本人为第一作者的期刊论文。</span></p>

{% bibliography --query @*[author_type=first] %}

<h2 class="pub-group-title"><span class="lang-en">Co-authored journal articles</span><span class="lang-zh">合作作者期刊论文</span></h2>
<p class="pub-group-note"><span class="lang-en">Collaborative work with colleagues at Manchester and SJTU.</span><span class="lang-zh">与曼彻斯特大学、上海交通大学同事的合作成果。</span></p>

{% bibliography --query @*[author_type=co] %}

</div>

<script>
  // Make each publication title link to its official paper page, reusing the
  // URL from the "HTML" button that jekyll-scholar renders from the bib `html` field.
  (function () {
    function linkTitles() {
      document.querySelectorAll(".publications ol.bibliography li").forEach(function (li) {
        var titleEl = li.querySelector(".title");
        if (!titleEl || titleEl.querySelector("a")) return;
        var btn = Array.prototype.slice
          .call(li.querySelectorAll(".links a.btn"))
          .filter(function (a) {
            return a.textContent.trim() === "HTML";
          })[0];
        if (!btn) return;
        var link = document.createElement("a");
        link.href = btn.href;
        link.target = "_blank";
        link.rel = "external nofollow noopener";
        link.innerHTML = titleEl.innerHTML;
        titleEl.innerHTML = "";
        titleEl.appendChild(link);
        btn.textContent = "Paper";
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", linkTitles);
    } else {
      linkTitles();
    }
  })();
</script>
