<script setup>
import { computed } from 'vue'
import { state, weekDays, currentStreak, dateKeyOffset, todayKey } from '../store'

const days = computed(() => weekDays().map(day => ({ ...day, count: state.habits.filter(habit => habit.completedDates.includes(day.key)).length })))
const total = computed(() => days.value.reduce((sum, day) => sum + day.count, 0))
const maximum = computed(() => Math.max(1, ...days.value.map(day => day.count)))
const bestHabit = computed(() => [...state.habits].sort((a, b) => currentStreak(b) - currentStreak(a))[0] || null)
const activeDays = computed(() => {
  const keys = Array.from({ length: 7 }, (_, index) => dateKeyOffset(-index))
  return new Set(state.habits.flatMap(habit => habit.completedDates.filter(day => keys.includes(day)))).size
})
const allTimeCheckins = computed(() => state.habits.reduce((sum, habit) => sum + habit.completedDates.length, 0))
</script>

<template>
  <section class="page-intro"><div><span class="eyebrow">NOTICE HOW FAR YOU'VE COME</span><h1>Your insights</h1><p>Progress isn't always loud. Here's a little reminder that it's happening.</p></div></section>
  <section class="insight-stats"><article class="panel insight-stat"><span class="stat-icon mint">✳</span><span><small>CHECK-INS THIS WEEK</small><strong>{{ total }}</strong><em>little wins, all counted</em></span></article><article class="panel insight-stat"><span class="stat-icon sage">◷</span><span><small>ACTIVE DAYS</small><strong>{{ activeDays }}<small> / 7</small></strong><em>days you showed up</em></span></article><article class="panel insight-stat"><span class="stat-icon lime">↗</span><span><small>ALL-TIME CHECK-INS</small><strong>{{ allTimeCheckins }}</strong><em>every step matters</em></span></article></section>
  <section class="insights-layout">
    <div class="panel consistency-panel"><div class="panel-heading"><div><span class="section-kicker">YOUR WEEK, YOUR WAY</span><h2>Weekly consistency</h2></div><span class="soft-tag">This week</span></div><div class="insights-chart"><div v-for="day in days" :key="day.key" class="insight-day"><div class="insight-value">{{ day.count || '' }}</div><div class="insight-track"><div class="insight-bar" :class="{ today: day.key === todayKey() }" :style="{ height: `${day.count ? Math.max(9, day.count / maximum * 100) : 3}%` }"></div></div><span>{{ day.label }}</span></div></div><div class="chart-footnote"><span class="legend-dot"></span> Habits completed each day</div></div>
    <div class="panel reflection-panel"><span class="section-kicker">A MOMENT TO CELEBRATE</span><div class="reflection-icon">✿</div><h2>{{ bestHabit ? bestHabit.name : 'Your next chapter starts here' }}</h2><p>{{ bestHabit && currentStreak(bestHabit) ? `You have a ${currentStreak(bestHabit)} day streak. That consistency is something to be proud of.` : 'Pick one small thing you would like to make time for this week.' }}</p><div class="reflection-footer"><span>YOUR LONGEST CURRENT STREAK</span><strong>{{ bestHabit ? currentStreak(bestHabit) : 0 }} <small>days</small></strong></div></div>
  </section>
  <section class="panel habit-history"><div class="panel-heading"><div><span class="section-kicker">THE LITTLE THINGS ADD UP</span><h2>Habit check-in history</h2></div></div><div v-if="state.habits.length" class="history-list"><div v-for="habit in state.habits" :key="habit.id" class="history-row"><span class="habit-color-dot" :class="habit.color"></span><strong>{{ habit.name }}</strong><div class="history-days"><span v-for="day in days" :key="day.key" :class="{ filled: habit.completedDates.includes(day.key) }" :title="`${day.label} ${day.date}`">{{ habit.completedDates.includes(day.key) ? '✓' : '' }}</span></div><small>{{ habit.completedDates.filter(day => days.some(item => item.key === day)).length }} / 7</small></div></div><div v-else class="empty-state">Add a habit to start building your history.</div></section>
</template>

