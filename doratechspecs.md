Here’s a technical project description you can use on your portfolio or CV, written so a senior dev or hiring manager can quickly see scope and depth.

---

# **Dora — Legal Practice Management SaaS**

## **One-liner for CV / LinkedIn**
*Full-stack B2B SaaS for Brazilian legal practices: Next.js 16 (App Router), Supabase (PostgreSQL + Auth), Stripe, TypeScript. Includes financial dashboard, AI-assisted workflows, LGPD-oriented flows, and account-based multi-tenant data model.*

---

## **What it is**
Dora is a **legal practice management SaaS** aimed at the Brazilian market. It covers **clients**, **processos** (cases), **financeiro** (revenue, expenses, fees, cash flow), **configurações** (profile, subscription, notifications, security), and an **AI-assisted dashboard**. The app is **account-scoped** (multi-tenant by account, single user per account in the current MVP), with auth, RLS, and entitlements wired end-to-end.

---

## **Tech stack (what a senior dev wants to see)**

| Layer | Technologies |
|-------|----------------|
| **Framework** | Next.js 16 (App Router), React 18, TypeScript 5 |
| **Styling & UI** | Tailwind CSS, shadcn/ui (New York style), Lucide + Tabler icons, Motion, CVA, `tailwind-merge` |
| **Backend / Data** | Supabase (PostgreSQL, Auth, Row Level Security), server-side Supabase client in API routes |
| **Payments** | Stripe (Checkout, Billing Portal, webhooks, subscription sync) — Pix, Boleto, Card |
| **Auth** | Supabase Auth (email/password, OAuth), session middleware, onboarding redirect by `user_metadata` |
| **Validation** | Zod schemas for API and forms (clients, financial records, processes) |
| **i18n** | next-intl, pt-BR messages |
| **Observability** | Sentry (Next.js SDK) |
| **Testing** | Vitest (unit), Playwright (e2e), Testing Library |
| **Deploy** | Vercel (root directory set to `app`), Turbopack for dev |

---

## **Design & UX**

- **Design system:** shadcn/ui (New York) + Tailwind; CSS variables for theming; reusable components (buttons, cards, data tables, modals, skeletons, tabs, paywall, trial badge).
- **Layout:** Responsive dashboard with sidebar navigation, global header (search, notifications, user menu), and mobile-friendly shell (drawer/menu).
- **Data-heavy UX:** Skeleton loaders, metric cards, data tables with sorting/filtering, export (CSV/HTML/email), period selector (single month or date range) for financeiro.
- **Brazilian context:** Formatting and validation for CPF/CNPJ/OAB, BRL currency, pt-BR copy and date formats.
- **AI surface:** Dedicated AI page and dashboard prompt input; AI engine with intent detection and OpenAI-compatible provider abstraction (mock for dev).

---

## **Architecture & backend**

- **API design:** REST-style API routes under `app/api/`: clients (CRUD + expand with process/client data), processes, financial (list + summary with date-range support), Stripe (checkout, portal, webhook, sync), AI, search, account, billing, audit-logs, LGPD (consent, export, delete), feedback, health, dev seed-data.
- **Data model:** Account-based: `accounts`, `profiles`, `subscriptions`; domain tables (e.g. `clients`, `processes`, `financial_records`) scoped by `account_id`. Subscription/entitlement checks for gated features.
- **Auth & session:** Middleware runs Supabase `updateSession`; protects all non-public routes; redirects unauthenticated users to login (with `callbackUrl`); redirects users without `full_name` to onboarding.
- **Security:** Server-only Supabase client for API routes; `getAuthUser()` + `getAccountId()` before data access; RLS and account-scoped queries; no client-side auth bypass in production.

---

## **Security & compliance**

- **LGPD-oriented:** Consent, export, and delete flows implemented (API + wiring in app).
- **Input validation:** Zod on API and forms; Brazilian validators (CPF/CNPJ) and tests.
- **Audit:** Audit logging library and audit-logs API for traceability.
- **Stripe:** Webhook signature verification; subscription state synced to app for entitlements.

---

## **Quality & maintainability**

- **TypeScript:** Strict mode; shared types and Zod-inferred types for API and forms.
- **Structure:** Clear split: `app/` (routes, API, layouts), `components/` (layout, dashboard, pages, ui), `lib/` (supabase, auth, ai, validations, hooks, stripe, lgpd, format, etc.).
- **Config:** Single source of truth for configs (next, tailwind, postcss, playwright, vitest, Sentry); duplicate rebase/backup configs removed; `turbopack.root` and `outputFileTracingRoot` aligned for Vercel builds.
- **Tests:** Unit tests (e.g. validators, format); e2e with Playwright (login, dashboard, clients CRUD, upgrade flow, health).

---

## **Portfolio bullets (copy-paste for CV)**

- Built a **full-stack legal practice SaaS** (Next.js 16, TypeScript, Supabase, Stripe) with **account-scoped multi-tenant model**, RLS, and subscription-based entitlements.
- Implemented **financial module** with period filters (month and date range), summary API, cash flow, and export; **Zod validation** and type-safe API contracts across clients, processes, and finance.
- Integrated **Stripe** (Checkout, Billing Portal, webhooks) and **Supabase Auth** with **middleware-based session handling** and onboarding redirects.
- Designed **reusable UI** with Tailwind and shadcn/ui; **responsive dashboard**, data tables, skeletons, and **pt-BR i18n** (next-intl).
- Added **LGPD-oriented** consent/export/delete flows, **audit logging**, and **Sentry** for error tracking; **Playwright e2e** and **Vitest** for critical paths and validators.
- Shipped to **Vercel** with correct monorepo root and **Turbopack** config; resolved TypeScript and Supabase query-builder typing for production builds.

---

You can use the **one-liner** in your CV/LinkedIn, the **Tech stack** table in a “Technologies” section, and the **Portfolio bullets** as achievement lines. If you want, I can shorten this to a single “Project description” paragraph (2–4 sentences) for a specific slot on your portfolio.