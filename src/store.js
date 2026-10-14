import { reactive, watch } from 'vue'

const STORAGE_KEY = 'daily-habit-tracker-v1'
const localDate = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const starterHabits = [
  { id: 1, name: 'Drink 8 glasses of water', category: 'Health', frequency: 'Daily', color: 'mint', completedDates: [] },
  { id: 2, name: 'Read for 20 minutes', category: 'Learning', frequency: 'Daily', color: 'sage', completedDates: [] },
  { id: 3, name: 'Take a morning walk', category: 'Movement', frequency: 'Daily', color: 'lime', completedDates: [] },
  { id: 4, name: 'Write in my journal', category: 'Mindfulness', frequency: 'Daily', color: 'forest', completedDates: [] },
]

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Array.isArray(saved.habits)) {
      return { habits: saved.habits, name: typeof saved.name === 'string' ? saved.name : 'Alex', weekStartsMonday: saved.weekStartsMonday !== false }
    }
  } catch { /* Start with demo data when storage is unavailable or invalid. */ }
  return { habits: starterHabits, name: 'Alex', weekStartsMonday: true }
}

export const state = reactive(loadState())
const ACCOUNT_KEY = 'daily-habit-accounts-v1'
function loadAccounts() {
  try {
    const saved = JSON.parse(localStorage.getItem(ACCOUNT_KEY))
    return Array.isArray(saved) ? saved.filter(item => item && item.email && item.passwordHash) : []
  } catch { return [] }
}
export const accounts = reactive(loadAccounts())
watch(accounts, value => {
  try { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(value)) } catch { /* Account creation requires browser storage. */ }
}, { deep: true })
const savedEmail = sessionStorage.getItem('daily-user-email')
const savedAccount = accounts.find(item => item.email === savedEmail)
export const auth = reactive({ authenticated: Boolean(savedAccount), email: savedAccount?.email || '' })
if (!savedAccount) sessionStorage.removeItem('daily-user-email')

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}

function startSession(account) {
  state.name = account.name
  auth.authenticated = true
  auth.email = account.email
  sessionStorage.setItem('daily-user-email', account.email)
}

export async function createAccount(name, email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  if (accounts.some(item => item.email === normalizedEmail)) return { ok: false, error: 'An account with this email already exists.' }
  try {
    const account = { id: globalThis.crypto.randomUUID(), name: name.trim().slice(0, 24), email: normalizedEmail, passwordHash: await hashPassword(password) }
    accounts.push(account)
    startSession(account)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Account storage is unavailable in this browser.' }
  }
}

export async function signIn(email, password) {
  const account = accounts.find(item => item.email === email.trim().toLowerCase())
  if (!account) return false
  try {
    if (account.passwordHash !== await hashPassword(password)) return false
    startSession(account)
    return true
  } catch { return false }
}

export function signOut() {
  sessionStorage.removeItem('daily-user-email')
  auth.authenticated = false
  auth.email = ''
}
watch(state, value => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch { /* The app still works for this session. */ }
}, { deep: true })

export const todayKey = () => localDate()
export function dateKeyOffset(offset, from = new Date()) {
  const date = new Date(from)
  date.setDate(date.getDate() + offset)
  return localDate(date)
}
export const isDoneToday = habit => habit.completedDates.includes(todayKey())

export function toggleToday(id) {
  const habit = state.habits.find(item => item.id === id)
  if (!habit) return
  const today = todayKey()
  habit.completedDates = habit.completedDates.includes(today)
    ? habit.completedDates.filter(day => day !== today)
    : [...habit.completedDates, today].sort()
}

export function createHabit(payload) {
  state.habits.unshift({
    id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
    name: payload.name.trim(),
    category: payload.category,
    frequency: payload.frequency,
    color: payload.color || 'mint',
    completedDates: [],
  })
}

export function updateHabit(id, payload) {
  const habit = state.habits.find(item => item.id === id)
  if (habit) Object.assign(habit, { name: payload.name.trim(), category: payload.category, frequency: payload.frequency, color: payload.color })
}

export function deleteHabit(id) {
  state.habits = state.habits.filter(item => item.id !== id)
}

export function resetDemoData() {
  state.habits = starterHabits.map(habit => ({ ...habit, completedDates: [] }))
  state.name = 'Alex'
  state.weekStartsMonday = true
}

export function currentStreak(habit) {
  let cursor = new Date()
  if (!habit.completedDates.includes(localDate(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (habit.completedDates.includes(localDate(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function weekDays() {
  const today = new Date()
  const day = today.getDay()
  const sinceStart = state.weekStartsMonday ? (day + 6) % 7 : day
  const start = new Date(today)
  start.setDate(today.getDate() - sinceStart)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return { key: localDate(date), label: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date), date: date.getDate() }
  })
}
