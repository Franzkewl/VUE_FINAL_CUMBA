<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { state, signOut } from "./store";

const route = useRoute();
const router = useRouter();
const isStandalone = computed(
  () =>
    route.path === "/" || route.path === "/login" || route.path === "/register",
);
const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "My Habits", path: "/habits", icon: "✓" },
  { label: "Insights", path: "/insights", icon: "↗" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];
function logout() {
  signOut();
  router.replace("/login");
}
</script>

<template>
  <RouterView v-if="isStandalone" />
  <div v-else class="app-shell">
    <aside class="sidebar">
      <RouterLink class="brand" to="/dashboard" aria-label="Daily home">
        <span class="brand-mark">d<span>+</span></span>
        <span class="brand-name">daily<small>HABIT TRACKER</small></span>
      </RouterLink>
      <div class="nav-label">MENU</div>
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span
          ><span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="sidebar-profile">
        <span class="avatar">{{ state.name.slice(0, 1).toUpperCase() }}</span
        ><span
          ><strong>{{ state.name }}</strong
          ><small>Your space</small></span
        ><button class="sidebar-logout" @click="logout">Log out</button>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar">
        <div>
          <span class="topbar-date">{{
            new Intl.DateTimeFormat("en", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(new Date())
          }}</span>
        </div>
      </header>
      <div class="page-content"><RouterView /></div>
    </main>
  </div>
</template>
