<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { createAccount } from "../store";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const busy = ref(false);
async function submit() {
  error.value = "";
  if (name.value.trim().length < 2) {
    error.value = "Please enter a name with at least 2 characters.";
    return;
  }
  if (password.value.length < 8) {
    error.value = "Choose a password with at least 8 characters.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "Your passwords do not match.";
    return;
  }
  busy.value = true;
  const result = await createAccount(name.value, email.value, password.value);
  busy.value = false;
  if (!result.ok) {
    error.value = result.error;
    return;
  }
  router.replace("/dashboard");
}
</script>

<template>
  <main class="login-page register-page">
    <RouterLink to="/" class="login-back">← Back to home</RouterLink>
    <section class="login-card">
      <RouterLink class="brand login-brand" to="/"
        ><span class="brand-mark">d<span>•</span></span
        ><span class="brand-name"
          >daily<small>HABIT TRACKER</small></span
        ></RouterLink
      >
      <span class="eyebrow">START A NEW ROUTINE</span>
      <h1>Create your account</h1>
      <p class="login-copy">
        Set up your space and begin with one small habit.
      </p>
      <form @submit.prevent="submit">
        <label for="register-name">Your name</label>
        <input
          id="register-name"
          v-model="name"
          autocomplete="name"
          maxlength="24"
          placeholder="e.g. Franz"
          required
        />
        <label for="register-email">Email address</label>
        <input
          id="register-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
        />
        <label for="register-password">Password</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          autocomplete="new-password"
          minlength="8"
          placeholder="At least 8 characters"
          required
        />
        <label for="register-confirm">Confirm password</label>
        <input
          id="register-confirm"
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          placeholder="Enter your password again"
          required
        />
        <p v-if="error" class="form-error">{{ error }}</p>
        <button class="button button-primary login-submit" :disabled="busy">
          {{ busy ? "Creating account..." : "Create account" }} <span>→</span>
        </button>
      </form>
      <p class="account-prompt">
        Already have an account? <RouterLink to="/login">Sign in</RouterLink>
      </p>
      <p class="login-demo-note">
        This learning demo saves accounts in your browser only. Do not use a
        real password.
      </p>
    </section>
    <span class="login-flower">✳</span>
  </main>
</template>
