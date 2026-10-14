<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { signIn } from '../store'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const busy = ref(false)
async function submit() {
  error.value = ''
  if (!email.value.trim() || !password.value) {
    error.value = 'Enter your email and password to continue.'
    return
  }
  busy.value = true
  const accepted = await signIn(email.value, password.value)
  busy.value = false
  if (!accepted) {
    error.value = 'We could not find an account with those details.'
    return
  }
  const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') ? route.query.redirect : '/dashboard'
  router.replace(redirect)
}
</script>

<template>
  <main class="login-page">
    <RouterLink to="/" class="login-back">← Back to home</RouterLink>
    <section class="login-card">
      <RouterLink class="brand login-brand" to="/">
        <span class="brand-mark">d<span>•</span></span><span class="brand-name">daily<small>HABIT TRACKER</small></span>
      </RouterLink>
      <span class="eyebrow">A FRESH DAY, A FRESH START</span>
      <h1>Welcome back</h1>
      <p class="login-copy">Sign in to pick up where your little habits left off.</p>
      <form @submit.prevent="submit">
        <label for="login-email">Email address</label>
        <input id="login-email" v-model="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        <label for="login-password">Password</label>
        <input id="login-password" v-model="password" type="password" autocomplete="current-password" placeholder="Your password" required />
        <p v-if="error" class="form-error">{{ error }}</p>
        <button class="button button-primary login-submit" :disabled="busy">{{ busy ? 'Signing in...' : 'Sign in' }} <span>→</span></button>
      </form>
      <p class="account-prompt">New to Daily? <RouterLink to="/register">Create an account</RouterLink></p>
      <p class="login-demo-note">Demo accounts are stored in this browser only. Do not use a real password.</p>
    </section>
    <span class="login-flower">✳</span>
  </main>
</template>
