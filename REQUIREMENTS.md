# Habit Tracker — Requirements

## Project goal
Create a simple, responsive Habit Tracker single-page application using Vue.js. The design should use green and white, support page navigation, and let a user manage habits and record daily progress.

## User needs
- I want a welcoming landing page that explains the tracker and takes me into the app.
- I want to see today's habits and mark them done.
- I want to add, view, edit, and remove habits.
- I want a weekly view that reflects my real check-ins.
- I want to change basic preferences and keep my data after refresh.
- I want to use the app on desktop and mobile.

## Scope and acceptance criteria

1. The app is built as a Vue 3 SPA with Vue Router.
2. The landing page is separate from at least three navigable app pages. This project provides Dashboard, My Habits, Insights, and Settings. A visitor can create an account and sign in before entering the tracker.
3. The interface uses a clean green and white visual theme and responsive layouts.
4. A habit has a name, category, frequency, and completion history.
5. The user can create a habit after entering a non-empty name.
6. Existing habits can be read on the Dashboard, My Habits, and Insights pages.
7. Existing habit details can be edited and a habit can be deleted after confirmation.
8. A user can toggle a habit's check-in for today; the dashboard totals, streaks, and insights reflect the change.
9. Habit data, display name, and week-start preference are saved to local storage.
10. Accounts can be registered with a name, email, and password, then used to sign in. The user can log out from Settings; protected tracker routes redirect to sign-in after logout.
11. The README explains how to run the project and describes the local-only data limitation.

## Page plan

| Page | Purpose |
| --- | --- |
| Welcome (`/`) | Introduce the app and link to the tracker |
| Sign in (`/login`) | Sign in to an existing browser account |
| Create account (`/register`) | Register a name, email, and password |
| Dashboard (`/dashboard`) | Today's check-ins, completion summary, and weekly snapshot |
| My Habits (`/habits`) | Search, filter, create, read, update, delete, and check in habits |
| Insights (`/insights`) | Weekly consistency and recent check-in history |
| Settings (`/settings`) | Name, week start preference, and demo data reset |

## CRUD plan

- **Create:** Form in My Habits adds a habit to the shared Vue store.
- **Read:** Shared store renders the habit list and derived totals on each page.
- **Update:** Edit form changes habit fields; the check-in button updates its completion history.
- **Delete:** Delete action confirms before removing the habit and its related history.

## Data and constraints

The app is a front-end learning project. It persists data in the current browser's local storage. No server, real user account, or synchronization between devices is included.
