<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { state, resetDemoData, signOut } from "../store";

const saved = ref(false);
const router = useRouter();
watch(
  () => state.name,
  () => {
    saved.value = false;
  },
);
function saveName() {
  const cleaned = state.name.trim();
  if (!cleaned) state.name = "Alex";
  else state.name = cleaned.slice(0, 24);
  saved.value = true;
}
function logout() {
  signOut();
  router.replace("/login");
}
function resetData() {
  if (
    window.confirm(
      "Reset your tracker to the original demo habits? Your habits and check-in history will be replaced.",
    )
  ) {
    resetDemoData();
    saved.value = false;
  }
}
</script>

<template>
  <section class="page-intro">
    <div>
      <span class="eyebrow">MAKE YOUR SPACE FEEL RIGHT</span>
      <h1>Settings</h1>
    </div>
  </section>
  <section class="settings-layout">
    <div class="panel settings-panel">
      <div class="settings-title">
        <span class="settings-icon mint">A</span>
        <div>
          <h2>Your profile</h2>
          <p>What should we call you?</p>
        </div>
      </div>
      <form class="settings-form" @submit.prevent="saveName">
        <label class="field-label" for="display-name">Display name</label
        ><input
          id="display-name"
          v-model="state.name"
          maxlength="24"
          placeholder="Your name"
        />
        <div class="form-actions">
          <span v-if="saved" class="saved-message">Changes saved</span
          ><button class="button button-primary">Save changes</button>
        </div>
      </form>
    </div>
    <div class="panel settings-panel">
      <div class="settings-title">
        <span class="settings-icon sage">W</span>
        <div>
          <h2>How your week starts</h2>
          <p>Choose the first day shown in your weekly view.</p>
        </div>
      </div>
      <div class="preference-row">
        <div>
          <strong>Start on Monday</strong
          ><small>Turn off to start your week on Sunday.</small>
        </div>
        <button
          class="switch"
          :class="{ on: state.weekStartsMonday }"
          role="switch"
          :aria-checked="state.weekStartsMonday"
          aria-label="Start week on Monday"
          @click="state.weekStartsMonday = !state.weekStartsMonday"
        >
          <span></span>
        </button>
      </div>
    </div>
    <div class="panel settings-panel data-panel">
      <div class="settings-title">
        <span class="settings-icon blush">R</span>
        <div>
          <h2>Your tracker data</h2>
          <p>Your habits are saved in this browser on this device.</p>
        </div>
      </div>
      <div class="data-note">
        <span>i</span>
        <p>
          This demo stores your information locally. Clearing browser storage
          will remove your habits and check-ins.
        </p>
      </div>
      <button class="button button-outline-danger" @click="resetData">
        Reset demo data
      </button>
    </div>
    <div class="panel settings-panel data-panel">
      <div class="settings-title">
        <span class="settings-icon blush">&rarr;</span>
        <div>
          <h2>Sign out</h2>
          <p>End your current session on this device.</p>
        </div>
      </div>
      <button
        class="button button-outline-danger logout-settings"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </section>
  <p class="settings-version">
    DAILY HABIT TRACKER · KEEP GROWING AT YOUR OWN PACE
  </p>
</template>
