<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { state, isDoneToday, toggleToday, currentStreak, weekDays, todayKey } from '../store'

const doneCount = computed(() => state.habits.filter(isDoneToday).length)
const progress = computed(() => state.habits.length ? Math.round(doneCount.value / state.habits.length * 100) : 0)
const week = computed(() => weekDays().map(day => ({ ...day, count: state.habits.filter(habit => habit.completedDates.includes(day.key)).length })))
const greeting = computed(() => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
})
</script>

<template>
  <section class="welcome-row">
    <div><span class="eyebrow">YOUR PERSONAL GROWTH SPACE</span><h1>{{ greeting }}, {{ state.name }} <span class="wave">✳</span></h1><p>Every little action is a vote for the person you want to become.</p></div>
    <RouterLink to="/habits" class="button button-primary">Manage habits <span>→</span></RouterLink>
  </section>
  <section class="dashboard-grid">
    <div class="panel today-panel">
      <div class="panel-heading"><div><span class="section-kicker">TODAY'S CHECK-IN</span><h2>Your daily rhythm</h2></div><span class="date-badge">{{ new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date()) }}</span></div>
      <div class="today-progress"><div class="progress-copy"><strong>{{ doneCount }}<small> / {{ state.habits.length }}</small></strong><span>habits completed</span><p>{{ progress === 100 && state.habits.length ? 'You showed up for every habit today. Lovely work!' : 'A small step still counts. Keep going at your own pace.' }}</p></div><div class="progress-ring" :style="{ '--progress': `${progress * 3.6}deg` }"><div><strong>{{ progress }}<small>%</small></strong><span>complete</span></div></div></div>
      <div class="today-habit-list">
        <div v-for="habit in state.habits.slice(0, 4)" :key="habit.id" class="today-habit-row">
          <button class="check-button" :class="{ checked: isDoneToday(habit) }" :aria-label="`${isDoneToday(habit) ? 'Mark incomplete' : 'Mark complete'}: ${habit.name}`" @click="toggleToday(habit.id)">{{ isDoneToday(habit) ? '✓' : '' }}</button>
          <span class="habit-color-dot" :class="habit.color"></span><span class="today-habit-name">{{ habit.name }}<small>{{ habit.category }}</small></span><span class="habit-streak">✳ {{ currentStreak(habit) }} day{{ currentStreak(habit) === 1 ? '' : 's' }}</span>
        </div>
        <div v-if="!state.habits.length" class="empty-state">Your first habit is waiting to be added.</div>
      </div>
      <RouterLink class="panel-footer-link" to="/habits">See all habits <span>→</span></RouterLink>
    </div>
    <div class="side-stack">
      <div class="panel week-panel">
        <div class="panel-heading"><div><span class="section-kicker">A LOOK BACK</span><h2>This week</h2></div><RouterLink class="text-link" to="/insights">Details <span>→</span></RouterLink></div>
        <div class="week-chart"><div v-for="day in week" :key="day.key" class="week-day"><div class="week-bar-track"><div class="week-bar" :class="{ today: day.key === todayKey() }" :style="{ height: `${state.habits.length ? Math.max(7, day.count / state.habits.length * 100) : 7}%` }"></div></div><span class="week-label">{{ day.label.slice(0, 1) }}</span></div></div>
        <div class="week-summary"><span class="summary-icon">↗</span><span><strong>{{ week.reduce((sum, day) => sum + day.count, 0) }} check-ins</strong><small>across {{ state.habits.length }} habits this week</small></span></div>
      </div>
      <div class="quote-card"><span class="quote-mark">“</span><p>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</p><small>— Aristotle</small><span class="quote-leaf">✳</span></div>
    </div>
  </section>
</template>

