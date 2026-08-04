# Northline — SaaS Dashboard

A full-stack SaaS dashboard starter built with **Next.js 14 (App Router)**, **TypeScript**,
**Redux Toolkit**, and **Tailwind CSS**. Includes authentication, a metrics dashboard, and a
billing/subscription flow — frontend and backend (API routes) in one project.

## Stack

- **Next.js 14** — App Router, Route Handlers as the API layer, middleware for route protection
- **TypeScript** — end to end
- **Redux Toolkit** — `authSlice`, `dashboardSlice`, `billingSlice` with async thunks
- **Tailwind CSS** — custom design tokens in `tailwind.config.ts`
- **jose** — JWT session tokens (edge-compatible, used in middleware)
- **bcryptjs** — password hashing
- **recharts** — dashboard charts
- **zod** — request validation on every API route

## Getting started

```bash
npm install
cp .env.example .env.local   # then set a real JWT_SECRET
npm run dev
```

Visit `http://localhost:3000`. You'll be redirected to `/login`.

**Demo account** (pre-filled on the login form):
- Email: `demo@northline.app`
- Password: `demo1234`

Or create a new account from `/signup` — it starts on the Starter plan.

## Project structure

```
src/
  app/
    (auth)/login, (auth)/signup        # public auth pages
    (dashboard)/dashboard, /billing,   # protected pages (see middleware.ts)
    (dashboard)/settings
    api/auth/...                       # signup, login, logout, me
    api/dashboard/...                  # stats, activity (mock data)
    api/billing/...                    # plans, subscribe (mock upgrade flow)
  components/
    ui/          # Button, Input, Card, Badge
    layout/      # Sidebar, Topbar, DashboardShell
    dashboard/   # StatCard, RevenueChart, UsersChart, RecentActivityTable
    billing/     # PlanCard
  lib/
    db.ts        # in-memory data layer — swap for a real database
    auth.ts      # JWT sign/verify
    session.ts   # cookie + current-user helpers
  store/
    store.ts, provider.tsx, hooks.ts, slices/
  middleware.ts  # protects /dashboard, /billing, /settings
```

## Important: before shipping to production

1. **Database** — `src/lib/db.ts` is an in-memory mock that resets on every restart.
   Swap it for Prisma + Postgres, Mongoose + MongoDB, or your database of choice, keeping the
   same function signatures (`findByEmail`, `create`, `updatePlan`, etc.) so the rest of the
   app doesn't need to change.
2. **Billing** — `src/app/api/billing/subscribe/route.ts` just flips a `plan` field. Wire it
   up to Stripe (Checkout Sessions + webhooks) or your billing provider before charging real
   money.
3. **Secrets** — set a strong, random `JWT_SECRET` in your deployment environment. Never commit
   `.env` or `.env.local` to git (already covered by `.gitignore`).
4. **Email verification / password reset** — not included; add as needed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
