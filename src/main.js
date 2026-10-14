import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Landing from './views/Landing.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'
import Habits from './views/Habits.vue'
import Insights from './views/Insights.vue'
import Settings from './views/Settings.vue'
import { auth } from './store'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Landing, meta: { title: 'Welcome' } },
    { path: '/login', component: Login, meta: { title: 'Sign in', guestOnly: true } },
    { path: '/register', component: Register, meta: { title: 'Create account', guestOnly: true } },
    { path: '/dashboard', component: Dashboard, meta: { title: 'Dashboard', requiresAuth: true } },
    { path: '/habits', component: Habits, meta: { title: 'My Habits', requiresAuth: true } },
    { path: '/insights', component: Insights, meta: { title: 'Insights', requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { title: 'Settings', requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() { return { top: 0 } },
})

router.beforeEach(to => {
  if (to.meta.requiresAuth && !auth.authenticated) return { path: '/login', query: { redirect: to.fullPath } }
  if (to.meta.guestOnly && auth.authenticated) return '/dashboard'
})

createApp(App).use(router).mount('#app')
