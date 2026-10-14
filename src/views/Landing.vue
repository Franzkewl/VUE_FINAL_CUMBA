<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="landing-page">
    <nav class="landing-nav">
      <RouterLink class="brand" to="/"><span class="brand-mark">d<span>•</span></span><span class="brand-name">daily<small>HABIT TRACKER</small></span></RouterLink>
      <RouterLink to="/login" class="nav-login">Sign in <span>↗</span></RouterLink>
    </nav>
    <section class="landing-hero">
      <div class="landing-copy">
        <span class="pill-label"><i></i> YOUR DAILY GROWTH COMPANION</span>
        <h1>Make space for<br /><em>better habits.</em></h1>
        <p>A calm place to build routines that feel good and last. Start small, check in each day, and watch your progress grow.</p>
        <div class="landing-actions"><RouterLink to="/register" class="button button-primary">Start tracking <span>→</span></RouterLink><span class="no-pressure">No streak pressure. Just progress.</span></div>
        <div class="landing-proof"><div class="proof-avatars"><span>A</span><span>J</span><span>M</span></div><span>One good day at a time</span><span class="proof-dot">•</span><span>Made for real life</span></div>
      </div>
      <div class="landing-art" aria-label="Illustration of a growing plant and weekly habit tracker" role="img">
        <div class="art-glow"></div><div class="sun"></div>
        <div class="art-card">
          <div class="art-card-head"><span><b>THIS WEEK</b><small>Your steady rhythm</small></span><span class="art-more">···</span></div>
          <div class="art-progress"><div class="ring"><span>72<small>%</small></span></div><div><strong>You're growing</strong><small>12 check-ins this week</small></div></div>
          <div class="art-habit"><span class="tiny-icon mint">✿</span><span><b>Morning walk</b><small>Movement</small></span><span class="checkmark">✓</span></div>
          <div class="art-habit"><span class="tiny-icon sage">▤</span><span><b>Read a little</b><small>Learning</small></span><span class="checkmark">✓</span></div>
          <div class="art-days"><span v-for="(day, i) in ['M','T','W','T','F','S','S']" :key="i" :class="{ checked: i < 5 }">{{ i < 5 ? '✓' : day }}</span></div>
        </div>
        <div class="plant-pot"><div class="plant-stem"></div><i class="leaf leaf-one"></i><i class="leaf leaf-two"></i><i class="leaf leaf-three"></i><i class="leaf leaf-four"></i><div class="pot"></div></div>
        <div class="float-chip"><span>✦</span> Little by little</div>
        <div class="art-caption">A softer way to stay consistent</div>
      </div>
    </section>
    <section class="landing-bottom"><span>BUILD A ROUTINE THAT FITS YOU</span><div><b>01</b> Choose what matters <i></i><b>02</b> Check in as you go <i></i><b>03</b> Celebrate showing up</div></section>
    <footer class="landing-footer"><span>© Daily Habit Tracker</span><span>Grow at your own pace <b>✳</b></span></footer>
  </main>
</template>
