# Little Lemon — React Web App

Accessible, responsive React app for **Little Lemon** restaurant.  
Includes Home, Booking (with validation), Confirmation, Sign Up, and Log In pages, unit tests, and a simple local “auth” mock.

## ✨ Features
- **Routing:** React Router with semantic layout (header/nav/main/footer)
- **Booking form:** date, time, diners, personal request
  - Zod validation (no past dates, time required, diners 1–12, request ≤ 280)
  - Accessible errors (`aria-invalid`, `aria-describedby`, `role="alert"`)
  - Keyboard focus moves to first invalid field
- **Auth:** Sign Up & Log In with validation and localStorage mock
  - Password show/hide with `aria-pressed`
  - Conditional nav + logout
- **A11y:** Skip link, proper landmarks, labeled controls, live regions, page `<title>` updates
- **Responsive:** Mobile-first CSS, comfortable tap targets, reduced-motion support
- **Tests:** Vitest + React Testing Library for Home, Booking flow, Auth, and Nav
- **Quality & CI:** ESLint config + GitHub Actions running lint & tests on each push

## 🗂️ Project structure
- src/
- components/ Header / Nav / Footer
- contexts/ AuthContext.jsx
- lib/ bookingSchema.js, authSchemas.js, useTitle.js
- pages/ Home.jsx, Booking.jsx, Confirmation.jsx, SignUp.jsx, Login.jsx
- pages/tests/ Home.test.jsx, Booking.test.jsx, Auth.test.jsx
- tests/ NavAndTitles.test.jsx
- App.jsx
- main.jsx
- styles.css

## 🚀 Getting started
```bash
npm i
npm run dev       # Start Vite dev server
npm run test      # Run unit tests
npm run test:watch
npm run test:coverage
npm run lint
npm run build     # Production build
npm run preview   # Preview build locally
