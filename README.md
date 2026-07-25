# mattplays.co

The personal site and portfolio of Matt Plays, live at [mattplays.co](https://mattplays.co).

This project began as a migration off Webflow—a faithful port of the original design onto a modern stack. That phase is done, and the site is live. From here it evolves into a fully bespoke portfolio.

## Stack

- [Next.js](https://nextjs.org) (App Router) with React
- [Sanity](https://www.sanity.io) for content — the Studio is embedded in the app at `/studio`
- [Tailwind CSS 4](https://tailwindcss.com) with custom design tokens
- Deployed on [Vercel](https://vercel.com), with Web Analytics and Speed Insights

## Design tokens & MPDS

Design tokens (type, color, spacing, radii) currently live in [`styles/tokens.css`](styles/tokens.css), ported from the original Webflow design. The plan is for this site to consume its tokens from [MPDS](https://github.com/matt-plays/mpds) — the design system library for Matt Plays projects—so that mattplays.co and sibling projects share one source of truth. Until that wiring lands, `tokens.css` is the local stand-in.

## Project structure

```
app/(site)/        Site routes (home, work, info, news, changelog, shop, style guide)
app/studio/        Embedded Sanity Studio
app/api/revalidate Webhook endpoint — Sanity content changes trigger on-demand revalidation
components/        Shared React components (+ components/blocks for portable-text blocks)
sanity/            Sanity config, schema types, and client helpers
styles/            Design tokens and custom CSS
scripts/           Content migration, image optimization, and visual-diff tooling
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

You'll need a `.env.local` with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=...   # for the /api/revalidate webhook
SANITY_API_WRITE_TOKEN=...     # only needed for migration scripts
```

## Scripts

- `npm run dev` / `npm run build` / `npm run start` — the usual Next.js lifecycle
- `npm run lint` — ESLint
- `npm run optimize` — optimize images in `public/` via sharp
- `scripts/migrate/` — one-time Webflow → Sanity content migration (kept for reference)
- `scripts/visual-diff/` — Playwright + pixelmatch screenshot comparison, used to verify parity during the migration
