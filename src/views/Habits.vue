<script setup>
import { computed, reactive, ref } from 'vue'
import { state, createHabit, updateHabit, deleteHabit, isDoneToday, toggleToday, currentStreak } from '../store'

const showForm = ref(false)
const editingId = ref(null)
const query = ref('')
const categoryFilter = ref('All habits')
const error = ref('')
const blankForm = () => ({ name: '', category: 'Health', frequency: 'Daily', color: 'mint' })
const form = reactive(blankForm())
const categories = ['Health', 'Movement', 'Learning', 'Mindfulness', 'Productivity', 'Other']
const visibleHabits = computed(() => state.habits.filter(habit => {
  const matchesQuery = habit.name.toLowerCase().includes(query.value.toLowerCase())
  return matchesQuery && (categoryFilter.value === 'All habits' || habit.category === categoryFilter.value)
}))

function openCreate() {
  editingId.value = null
  Object.assign(form, blankForm())
  error.value = ''
  showForm.value = true
}
function openEdit(habit) {
  editingId.value = habit.id
  Object.assign(form, { name: habit.name, category: habit.category, frequency: habit.frequency, color: habit.color })
  error.value = ''
  showForm.value = true
}
function saveHabit() {
  if (!form.name.trim()) { error.value = 'Give your habit a name first.'; return }
  if (editingId.value) updateHabit(editingId.value, form)
  else createHabit(form)
  showForm.value = false
}
function removeHabit(habit) {
  if (window.confirm(`Delete “${habit.name}”? Its check-in history will also be removed.`)) deleteHabit(habit.id)
}
</script>

<template>
  <section class="page-intro"><div><span class="eyebrow">MAKE IT YOURS</span><h1>My habits</h1><p>Build a routine around the things that matter to you.</p></div><button class="button button-primary" @click="openCreate"><span class="plus">＋</span> Add a habit</button></section>
  <section class="habits-toolbar"><label class="search-box"><span>⌕</span><input v-model="query" type="search" placeholder="Find a habit..." aria-label="Search habits" /></label><label class="select-wrap"><span class="visually-hidden">Filter by category</span><select v-model="categoryFilter"><option>All habits</option><option v-for="category in categories" :key="category">{{ category }}</option></select></label><span class="result-count">{{ visibleHabits.length }} {{ visibleHabits.length === 1 ? 'habit' : 'habits' }}</span></section>
  <section class="habit-cards">
    <article v-for="habit in visibleHabits" :key="habit.id" class="habit-card">
      <div class="habit-card-top"><span class="habit-card-icon" :class="habit.color">{{ habit.category === 'Learning' ? '▤' : habit.category === 'Movement' ? '↗' : habit.category === 'Mindfulness' ? '☼' : '✿' }}</span><div class="habit-card-actions"><button aria-label="Edit habit" title="Edit habit" @click="openEdit(habit)">✎</button><button aria-label="Delete habit" title="Delete habit" @click="removeHabit(habit)">×</button></div></div>
      <h2>{{ habit.name }}</h2><div class="habit-card-meta"><span>{{ habit.category }}</span><i></i><span>{{ habit.frequency }}</span></div>
      <div class="habit-card-bottom"><span class="streak-label">✳ {{ currentStreak(habit) }} day streak</span><button class="toggle-done" :class="{ complete: isDoneToday(habit) }" @click="toggleToday(habit.id)">{{ isDoneToday(habit) ? 'Completed today ✓' : 'Mark as done' }}</button></div>
    </article>
    <button class="add-card" @click="openCreate"><span>＋</span><strong>Create a new habit</strong><small>Make a little room for growth</small></button>
    <div v-if="!visibleHabits.length && state.habits.length" class="panel empty-filter">No habits match that search. Try a different name or category.</div>
    <div v-if="!state.habits.length" class="panel empty-filter"><span class="empty-flower">✿</span><h2>A fresh start</h2><p>Add a habit you'd like to make part of your day.</p><button class="button button-primary" @click="openCreate">Add your first habit</button></div>
  </section>
  <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false" @keydown.esc="showForm = false">
    <section class="modal-card" role="dialog" aria-modal="true" :aria-labelledby="'habit-form-title'">
      <button class="modal-close" aria-label="Close dialog" @click="showForm = false">×</button><span class="section-kicker">A LITTLE INTENTION</span><h2 id="habit-form-title">{{ editingId ? 'Edit your habit' : 'Create a habit' }}</h2><p class="modal-intro">Keep it simple and make it yours.</p>
      <form @submit.prevent="saveHabit"><label class="field-label" for="habit-name">Habit name</label><input id="habit-name" v-model="form.name" maxlength="56" placeholder="e.g. Stretch for five minutes" autofocus /><p v-if="error" class="form-error">{{ error }}</p>
        <label class="field-label" for="habit-category">Category</label><select id="habit-category" v-model="form.category"><option v-for="category in categories" :key="category">{{ category }}</option></select>
        <label class="field-label" for="habit-frequency">Frequency</label><select id="habit-frequency" v-model="form.frequency"><option>Daily</option><option>Weekdays</option><option>Weekly</option></select>
        <div class="form-actions"><button type="button" class="button button-quiet" @click="showForm = false">Cancel</button><button class="button button-primary">{{ editingId ? 'Save changes' : 'Create habit' }}</button></div>
      </form>
    </section>
  </div>
</template>
