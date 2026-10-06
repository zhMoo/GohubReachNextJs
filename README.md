# Jelajah Malaysia: Next.js App Router Assignment (JavaScript)

*Jelajah* means "explore". This app lets you explore Malaysia's 13 states and 3 federal
territories: capitals, regions, famous food and places to visit. It also has a small guestbook.

**All data is local.** It lives in one file, `lib/storage.js`. There is no third-party API,
no database and no external fonts, so the app works fully offline.

Created with `create-next-app` using these settings:

| Option | Choice |
| --- | --- |
| TypeScript | No (plain JavaScript) |
| Linter | ESLint |
| React Compiler | Yes (`reactCompiler: true` in `next.config.mjs`) |
| Tailwind CSS | No (plain CSS in `app/globals.css`) |
| `src/` directory | No |
| App Router | Yes |
| Import alias | Default `@/*` (see `jsconfig.json`) |
| AGENTS.md | No |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run build && npm start   # production build
```

Needs Node.js 20.9+.

## Pages

| URL | What it shows |
| --- | --- |
| `/` | Home, with a client-side "explore by region" box |
| `/states` | All 16 states & federal territories, with search and a region filter |
| `/states/[slug]` | One state, e.g. `/states/sabah` |
| `/regions/[region]` | States in one region, e.g. `/regions/east-coast` |
| `/dashboard` | Overview: counts and a table by region |
| `/dashboard/guestbook` | Guestbook: post a message (Server Action) |
| `/dashboard/settings` | Client-side settings form |
| `/about` | About page (inside a route group) |
| `/api/states?region=...` | Route Handler returning states as JSON |

## Where each requirement is implemented

| Requirement | Where |
| --- | --- |
| **Server components** (the default) | `app/page.js`, `app/states/page.js`, `app/states/[slug]/page.js`, `app/regions/[region]/page.js`, `app/dashboard/page.js`, `app/dashboard/guestbook/page.js` |
| **Client components** (`"use client"`) | `components/Navbar.js`, `SidebarLink.js`, `StateFilter.js` (search + filter), `VisitedButton.js`, `RegionExplorer.js` (browser fetch), `GuestbookForm.js` (form + Server Action), `app/dashboard/settings/page.js`, `app/error.js` |
| **Dynamic routing** | `app/states/[slug]` and `app/regions/[region]`, with `generateStaticParams` (pre-built at build time), `generateMetadata` (page titles), `dynamicParams = false` + `notFound()` (404 for unknown slugs) |
| **Custom layouts** | Root `app/layout.js` (navbar + footer); nested `app/dashboard/layout.js` (sidebar); route group `app/(marketing)/layout.js` (serves `/about` with a narrow layout) |
| **Navigation** | `next/link` everywhere; active-link highlighting with `usePathname()` in the navbar and sidebar; region tabs; breadcrumbs; `loading.js`, `not-found.js`, `error.js` |
| **Data fetching** | Server components `await` the async functions in `lib/storage.js`; `Promise.all` parallel loading (dashboard); client-side `fetch()` to the Route Handler `app/api/states/route.js` (`RegionExplorer`); writing data with a Server Action (`app/dashboard/guestbook/actions.js`) |

## About `lib/storage.js`

- `REGIONS` and the states list are read-only data.
- `getStates()`, `getState(slug)`, `getMessages()` are `async` and include a short simulated delay,
  so pages use them just like real data fetching and the loading screens (`loading.js`) are visible.
- `addMessage()` adds a guestbook message **in server memory**. Messages reset when the server
  restarts. To keep them permanently, only `storage.js` would need to change (e.g. to a database).

## Folder structure

```
app/
  layout.js               root layout (Navbar)
  page.js                 home
  loading.js / error.js / not-found.js
  api/states/route.js     route handler (JSON endpoint)
  states/
    page.js               all states (+ loading.js)
    [slug]/page.js        dynamic route: one state
  regions/
    [region]/page.js      dynamic route: one region
  dashboard/              nested layout with sidebar
    page.js               overview
    guestbook/            page.js + actions.js (Server Action)
    settings/             client-side form
  (marketing)/            route group (not part of the URL)
    layout.js
    about/page.js         -> /about
components/               client components
lib/
  storage.js              all app data (local)
```
"# GohubReachNextJs" 
