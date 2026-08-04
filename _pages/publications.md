---
layout: page
permalink: /publications/
title: Publications
nav: true
nav_order: 3
---

{% include lang_toggle.liquid %}

<style>
  /* Abstract styling lives in site_enhancements.liquid so both places cannot drift. */
  .pub-group-title {
    border-bottom: 2px solid var(--global-theme-color);
    padding-bottom: 0.3rem;
    margin-top: 2.5rem;
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

<div class="publications">

<h2 class="pub-group-title"><span class="lang-en">First-author journal articles</span><span class="lang-zh">第一作者期刊论文</span></h2>

{% bibliography --query @*[author_type=first] %}

<h2 class="pub-group-title"><span class="lang-en">Co-authored journal articles</span><span class="lang-zh">合作作者期刊论文</span></h2>

{% bibliography --query @*[author_type=co] %}

</div>

<script>
  // Make each publication title link to its official paper page, reusing the
  // URL from the "HTML" button that jekyll-scholar renders from the bib `html` field.
  (function () {
    function linkTitles() {
      document.querySelectorAll(".publications ol.bibliography li").forEach(function (li) {
        var abstractBtn = li.querySelector("a.abstract.btn");
        if (abstractBtn) abstractBtn.innerHTML = "<span class=\"lang-en\">Abstract</span><span class=\"lang-zh\">摘要</span>";
        var titleEl = li.querySelector(".title");
        if (!titleEl || titleEl.querySelector("a")) return;
        var btn = Array.prototype.slice
          .call(li.querySelectorAll(".links a.btn"))
          .filter(function (a) {
            return a.textContent.trim() === "HTML";
          })[0];
        if (!btn) return;
        btn.target = "_blank";
        btn.rel = "external nofollow noopener";
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
