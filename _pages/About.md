---
layout: page
title: About
permalink: /HenryBuron_About
hide_title: true
description: "Robotics Software Engineer at Swarmbotics AI. Previously NASA JPL. M.S. in Robotics from Northwestern."
---

<div class="about__intro">
  <img class="about__photo" src="{{ site.baseurl }}/assets/images/henry_pfp.jpg" alt="Henry Buron">

  <div class="about__bio">
    <h1 class="article__title">Henry Buron</h1>

    <p>I'm a Robotics Software Engineer at <a href="https://www.swarmbotics.ai/" target="_blank" rel="noopener">Swarmbotics AI</a> in Phoenix, AZ. Before that I interned with the Robotic Mobility group at NASA's Jet Propulsion Laboratory.</p>

    <p>I'm interested in autonomous systems, state estimation, and mobile robots.</p>
  </div>
</div>

<h2 class="section__label">Experience</h2>

<ul class="timeline">
  <li>
    <img class="timeline__logo" src="{{ site.baseurl }}/assets/images/swarmbotics_ai_logo.jpeg" alt="Swarmbotics AI">
    <div>
      <div class="timeline__role">Robotics Software Engineer</div>
      <div class="timeline__org">Swarmbotics AI</div>
      <div class="timeline__date">Jan 2025 &ndash; Present <span class="timeline__tenure" data-since="2025-01"></span></div>
    </div>
  </li>
  <li>
    <img class="timeline__logo" src="{{ site.baseurl }}/assets/images/nasa_jpl.jpeg" alt="NASA JPL">
    <div>
      <div class="timeline__role">Robotics Software Intern</div>
      <div class="timeline__org">NASA Jet Propulsion Laboratory</div>
      <div class="timeline__date">Jun 2024 &ndash; Sep 2024 <span class="timeline__tenure" data-since="2024-06" data-until="2024-09"></span></div>
    </div>
  </li>
</ul>

<h2 class="section__label">Education</h2>

<ul class="timeline">
  <li>
    <img class="timeline__logo" src="{{ site.baseurl }}/assets/images/nu.jpeg" alt="Northwestern University">
    <div>
      <div class="timeline__role">M.S. in Robotics</div>
      <div class="timeline__org">Northwestern University</div>
      <div class="timeline__date">Sep 2023 &ndash; Dec 2024</div>
    </div>
  </li>
  <li>
    <img class="timeline__logo" src="{{ site.baseurl }}/assets/images/wm.jpeg" alt="William &amp; Mary">
    <div>
      <div class="timeline__role">B.S. in Engineering Physics</div>
      <div class="timeline__org">William &amp; Mary</div>
      <div class="timeline__date">Sep 2019 &ndash; May 2023</div>
    </div>
  </li>
</ul>

<h2 class="section__label">Contact</h2>

<ul class="contact-list">
  <li><span class="contact-list__key">GitHub</span> <a href="https://github.com/henryburon" target="_blank" rel="noopener">github.com/henryburon</a></li>
  <li><span class="contact-list__key">LinkedIn</span> <a href="{{ site.authors.Henry.LinkedIn }}" target="_blank" rel="noopener">linkedin.com/in/henryburon</a></li>
</ul>

<h2 class="section__label">Résumé</h2>

<p>
  <a class="btn btn--primary" href="{{ site.baseurl }}/_pages/HenryBuronResume.pdf" target="_blank" rel="noopener">
    Download résumé (PDF)
  </a>
</p>

<script>
// Fills in "(1 yr 7 mos)" next to each role. Runs in the visitor's browser on
// every page load, so an ongoing role stays current without a rebuild.
// Add data-since="YYYY-MM" to a span; add data-until="YYYY-MM" for a past role.
(function () {
  function label(months) {
    var years = Math.floor(months / 12);
    var rest = months % 12;
    var parts = [];
    if (years) { parts.push(years + ' yr' + (years > 1 ? 's' : '')); }
    if (rest) { parts.push(rest + ' mo' + (rest > 1 ? 's' : '')); }
    return parts.length ? parts.join(' ') : '< 1 mo';
  }

  function parse(value) {
    var bits = value.split('-');
    return new Date(Number(bits[0]), Number(bits[1]) - 1, 1);
  }

  var spans = document.querySelectorAll('.timeline__tenure[data-since]');
  Array.prototype.forEach.call(spans, function (el) {
    var start = parse(el.getAttribute('data-since'));
    var until = el.getAttribute('data-until');
    var end = until ? parse(until) : new Date();

    var months = (end.getFullYear() - start.getFullYear()) * 12
               + (end.getMonth() - start.getMonth());
    if (months < 0) { months = 0; }

    // Count both the first and last month, the way LinkedIn does: Jun-Sep
    // reads "4 mos", and a role started this month reads "1 mo".
    months += 1;

    el.textContent = '(' + label(months) + ')';
  });
})();
</script>
