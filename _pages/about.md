---
layout: about
title: about
permalink: /
subtitle: "PhD Candidate in Production and Manufacturing Engineering, The University of Manchester"

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Manchester, UK</p>
    <p>chandler.yx.chen@gmail.com</p>

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items

latest_posts:
  enabled: false
---

<style>
.profile { max-width: 200px !important; }
</style>

<div style="margin-bottom: 1em;">
  <button onclick="setSiteLang('en')" id="lang-btn-en" style="padding: 4px 12px; margin-right: 6px; cursor: pointer;">English</button>
  <button onclick="setSiteLang('zh')" id="lang-btn-zh" style="padding: 4px 12px; cursor: pointer;">中文</button>
</div>

<div class="lang-en" markdown="1">
I am a PhD candidate in Production and Manufacturing Engineering at **The University of Manchester**, specializing in robotics and advanced manufacturing with a focus on motion planning, trajectory optimization, and process planning.

My research centers on robotic manufacturing and hybrid additive-subtractive processes, particularly for multi-axis robotic systems and complex geometries. I develop scalable computational methods that integrate geometric modeling, numerical optimization, and learning-based techniques to improve manufacturability, efficiency, and reliability.

I hold an MEng and a BEng in Mechanical Engineering from **Shanghai Jiao Tong University**.
</div>

<div class="lang-zh" markdown="1" style="display: none;">
我是英国曼彻斯特大学（The University of Manchester）生产与制造工程专业的博士研究生，研究方向为机器人学与先进制造的交叉领域，重点关注机器人辅助制造中的运动规划、轨迹优化与工艺规划。

我的研究聚焦机器人辅助制造与增减材复合制造，尤其面向多轴机器人系统和复杂几何结构的可制造性分析与工艺生成。致力于发展可扩展的计算方法，将几何建模、数值优化与机器学习方法结合，用于提升制造效率、可靠性和复杂零件的可制造性。

本科及硕士毕业于上海交通大学机械工程专业。
</div>

<script>
function setSiteLang(lang) {
  document.querySelectorAll('.lang-en').forEach(function(el) { el.style.display = (lang === 'en') ? '' : 'none'; });
  document.querySelectorAll('.lang-zh').forEach(function(el) { el.style.display = (lang === 'zh') ? '' : 'none'; });
  var enBtn = document.getElementById('lang-btn-en');
  var zhBtn = document.getElementById('lang-btn-zh');
  if (enBtn && zhBtn) {
    enBtn.style.fontWeight = (lang === 'en') ? 'bold' : 'normal';
    zhBtn.style.fontWeight = (lang === 'zh') ? 'bold' : 'normal';
  }
}
setSiteLang('en');
</script>
