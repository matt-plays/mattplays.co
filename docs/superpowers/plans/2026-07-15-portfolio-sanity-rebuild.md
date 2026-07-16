# mattplays.co Sanity Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mirror mattplays.co as a Next.js 15 + Sanity site (Studio at `/studio`), all three Webflow collections editable in Sanity, deployed on Vercel — no domain changes until parity.

**Architecture:** Single Next.js App Router app with embedded Sanity Studio. Static generation + tag-based revalidation via Sanity webhook. One-time migration scripts convert Webflow CSV/HTML exports into Sanity documents and re-host every asset on Sanity's CDN.

**Tech Stack:** Next.js 16 (bumped from 15 — current `next-sanity` requires it), React 19, TypeScript, Tailwind, `sanity` + `next-sanity`, Vercel Analytics, Vercel hosting.

> **Status (2026-07-15):** Phases 0–4 complete and Phase 5 parity pass done — all
> routes verified against the live site, fixes committed. Sanity project
> `nexjv4lx` holds all content (12 changelog, 60 blog, 13 projects incl. case
> study bodies, 159 images + video file assets); revalidation webhook created.
> Branch pushed; Vercel deploy currently **blocked at platform level** — needs
> Matt to unblock in the Vercel dashboard and add env vars
> (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
> `SANITY_REVALIDATE_SECRET` — values in `.env.local`). Phase 6 (cutover)
> remains Matt-gated. Deviations from plan: Next 16; `videoLoop` block type
> added for self-hosted looping videos; blocks parsed by script + agent QA
> instead of pure manual pass.

**Source materials:**
- CSVs: `~/Downloads/Portfolio - {Changelog Updates,Blog Posts,Projects} - *.csv`
- Webflow export: `~/Downloads/mattplays.webflow.zip` (HTML/CSS reference + assets)
- Asset fallback: `~/Library/CloudStorage/Dropbox/Personal/2025/Portfolio/Deliverables`
- Live site: `https://mattplays.co` (parity reference; also CDN source for missing assets)

---

## Phase 0 — Clean slate

### Task 0.1: Clear old code from the branch

**Files:** Delete `app/`, `components/`, `styles/`, `content/`, `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, `.next/`, `node_modules/` (git rm where tracked). Keep `.gitignore`, `docs/`, `.claude/`, `.vercel/`.

- [ ] Step 1: `git rm -r` tracked legacy files; delete untracked build dirs
- [ ] Step 2: Commit: `chore: clear legacy code for rebuild`

## Phase 1 — Scaffold

### Task 1.1: Next.js app scaffold

**Files:** Create `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `postcss.config.mjs`, `tailwind.config.ts`, `.env.local` (gitignored), `.gitignore` update.

- [ ] Step 1: `npx create-next-app@15 . --ts --tailwind --app --no-src-dir --import-alias "@/*"` (into the cleaned worktree; merge with existing .gitignore)
- [ ] Step 2: `npm run build` → expect success
- [ ] Step 3: Commit: `chore: scaffold next 15 app`

### Task 1.2: Fonts + design tokens

**Files:** Create `public/fonts/*` (from zip `fonts/`), `app/fonts.ts` (next/font/local: SharpGrotesk-SemiBold23, Söhne Buch, Söhne Mono), extend `tailwind.config.ts` + `app/globals.css` with color/type/spacing tokens extracted from `css/mattplays.webflow.css` (fluid type via clamp, body/footer/promo colors, >1600w scale-up).

- [ ] Step 1: Extract fonts from zip → `public/fonts/` (handle the Söhne unicode filename)
- [ ] Step 2: `app/fonts.ts` with `next/font/local` exports; wire CSS variables in `layout.tsx`
- [ ] Step 3: Port token values from Webflow CSS into Tailwind theme + CSS custom properties
- [ ] Step 4: Commit: `feat: self-hosted fonts and design tokens`

### Task 1.3: Vercel Analytics

- [ ] Step 1: `npm i @vercel/analytics`; add `<Analytics />` to `app/layout.tsx`
- [ ] Step 2: Commit: `feat: vercel analytics`

## Phase 2 — Sanity

### Task 2.1: Create Sanity project + embed Studio

**Files:** Create `sanity.config.ts`, `sanity.cli.ts`, `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`, `app/studio/[[...tool]]/page.tsx`, `.env.local` entries.

- [ ] Step 1: `npx sanity@latest projects create` (or `sanity init --env`) → project "mattplays.co", dataset `production`; record `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Step 2: `npm i sanity next-sanity @sanity/vision @sanity/image-url`
- [ ] Step 3: Studio route `app/studio/[[...tool]]/page.tsx` per next-sanity docs; `sanity.config.ts` with structure + vision plugins
- [ ] Step 4: `npm run dev` → `/studio` loads and authenticates
- [ ] Step 5: Commit: `feat: sanity studio embedded at /studio`

### Task 2.2: Schemas

**Files:** Create `sanity/schemaTypes/index.ts`, `project.ts`, `changelogEntry.ts`, `blogPost.ts`, `siteSettings.ts`, `blocks/{textSection,mediaGrid,siteCompSection,creditGrid,quote,videoEmbed}.ts`, shared `richText.ts`.

Schema outline (fields mirror the CSVs + case-study components):

```ts
// project
{name: 'project', fields: [title, slug, description(text), roles(string), color(simplerColor or string),
 heroVisual(image), primaryThumbnail(image), secondaryThumbnail(image), order(number),
 body: array of [textSection, mediaGrid, siteCompSection, creditGrid, quote, videoEmbed]]}
// changelogEntry
{title, slug, date(date), image(image, optional), body(richText)}
// blogPost
{title, slug, date, summary(text), featured(boolean), color(string), mainImage, thumbnail, body(richText)}
// siteSettings (singleton)
{promoBar: {enabled, text, link, perPageOverrides[]}, navLinks[], footerLinks[], socials[]}
```

- [ ] Step 1: Write all schema files; register in `sanity.config.ts`
- [ ] Step 2: Studio loads; create one test doc of each type; delete after
- [ ] Step 3: Commit: `feat: sanity schemas for project/changelog/blog/settings`

### Task 2.3: Data layer

**Files:** Create `sanity/lib/queries.ts` (GROQ: allProjects ordered, projectBySlug, allChangelog, siteSettings), `sanity/lib/fetch.ts` (`sanityFetch` with tags), `app/api/revalidate/route.ts` (webhook → `revalidateTag`), draft mode routes `app/api/draft-mode/enable/route.ts`.

- [ ] Step 1: Queries + typed fetch helper with `next: {tags: [...]}`
- [ ] Step 2: Revalidate webhook route validating `SANITY_REVALIDATE_SECRET`
- [ ] Step 3: Commit: `feat: sanity data layer + revalidation webhook`

## Phase 3 — Migration

### Task 3.1: Asset inventory + downloader

**Files:** Create `scripts/migrate/assets.ts`, `scripts/migrate/manifest.json` (generated, gitignored).

- [ ] Step 1: Scan all three CSVs + the 13 `work/*.html` pages for `uploads-ssl.webflow.com` / `cdn.prod.website-files.com` URLs → manifest
- [ ] Step 2: Download each (zip `images/` first, live CDN second, log misses for Dropbox lookup) → `scripts/migrate/.assets/` (gitignored)
- [ ] Step 3: Verify `HelpScout-DelightLabs-11-p-2600.jpg` recovered; zero misses
- [ ] Step 4: Commit: `feat: migration asset inventory + downloader`

### Task 3.2: CSV → Sanity import (changelog + blog + project metadata)

**Files:** Create `scripts/migrate/lib/csv.ts`, `lib/htmlToPortableText.ts` (`@sanity/block-tools` + jsdom; strip Squarespace artifacts: escaped img tags in figcaptions, empty `<p>`), `import-changelog.ts`, `import-blog.ts`, `import-projects.ts`.

- [ ] Step 1: HTML→PT converter with custom rules for figures/images (image refs point at uploaded Sanity assets), links, embeds (iframe → videoEmbed block)
- [ ] Step 2: Upload assets via `client.assets.upload`, cache asset IDs in manifest
- [ ] Step 3: Import 12 changelog entries; spot-check in Studio
- [ ] Step 4: Import ~60 blog posts; spot-check 5 in Studio (formatting, images)
- [ ] Step 5: Import 14 projects (metadata; Help Scout Marketing Site as draft `drafts.` doc)
- [ ] Step 6: Commit after each importer: `feat: migrate <collection>`

### Task 3.3: Case study bodies → page-builder content

**Files:** Create `scripts/migrate/import-casestudies.ts` + per-page block extraction; reference `scratchpad/webflow/work/*.html`.

- [ ] Step 1: Parse each `work/*.html`: map Webflow sections (`textsection-container`, media grids, `sitecompsection-*`, credit lists, hero) → block objects
- [ ] Step 2: Import bodies into the 13 `project` docs (patch `body`)
- [ ] Step 3: Manual QA pass per case study in Studio against live page; fix extraction gaps by hand where cheaper than code
- [ ] Step 4: Commit: `feat: migrate case study bodies`

## Phase 4 — Site build

### Task 4.1: Global chrome

**Files:** Create `components/Nav.tsx`, `components/PromoBar.tsx`, `components/Footer.tsx`, `components/PageTransition.tsx`, `components/Tooltip.tsx` (coming-soon tooltips), `app/layout.tsx` wiring; reference `scratchpad/webflow/index.html` markup/classes.

- [ ] Steps: build each against exported HTML; promo bar reads siteSettings (changelog-aware hiding); commit per component group

### Task 4.2: Homepage

**Files:** `app/page.tsx`, `components/home/*` (h1 hover interaction, collage grid with project links from Sanity).

### Task 4.3: Work index + case study template

**Files:** `app/work/page.tsx` (project grid), `app/work/[slug]/page.tsx` (`generateStaticParams` from Sanity), `components/blocks/*` renderer per block type, `components/ProjectList.tsx` (prev/next navigation punctuating each case study).

### Task 4.4: Changelog

**Files:** `app/changelog/page.tsx` (list w/ image-friendly layout), styled rich text.

### Task 4.5: Static pages

**Files:** `app/info/page.tsx` (incl. `#colophon`, `#press-mentions` anchors), `app/style-guide/page.tsx`, `app/shop/page.tsx`, `app/news/page.tsx`, `app/test/page.tsx`, `app/hero-sketch/page.tsx`, `app/lp/creative-south-2025/page.tsx`, `app/not-found.tsx` — ported from export HTML.

### Task 4.6: SEO + feeds

**Files:** `app/sitemap.ts`, `app/robots.ts`, per-page `generateMetadata` (mirror Webflow titles/OG), `app/changelog/rss.xml/route.ts`, favicons in `app/`.

- [ ] Each 4.x task: build → `npm run build` green → commit.

## Phase 5 — Parity + deploy

### Task 5.1: Parity pass

- [ ] Step 1: `npm run build && npm start`; browser-drive every route vs `https://mattplays.co` equivalent (desktop + mobile widths); log diffs, fix
- [ ] Step 2: Check: promo bar behavior, tooltips, transitions, fonts, >1600w scaling, 404

### Task 5.2: Vercel

- [ ] Step 1: Link existing Vercel project (`.vercel/` present); `vercel env add` Sanity vars (+ webhook secret)
- [ ] Step 2: Preview deploy; verify `/studio` works on deployed URL (add deployed origin to Sanity CORS)
- [ ] Step 3: Configure Sanity webhook → `/api/revalidate`; verify publish→revalidate loop
- [ ] Step 4: Share preview URL with Matt

### Task 5.3: Linear backlog

- [ ] File issues in Work & Portfolio: blog public pages, blog RSS, any parity follow-ups found

## Phase 6 — Cutover (Matt-gated; not executed autonomously)

- [ ] Merge branch → `main`; production deploy
- [ ] Matt updates DNS web records to Vercel (MX untouched)
- [ ] Webflow paused ~2 weeks, then cancel

---

## Self-review notes

- Spec coverage: all spec sections map to phases (CDN independence→3.1/3.2; all pages kept→4.5; RSS groundwork→4.6; Vercel Analytics→1.3; draft content→3.2 step 5; promo overrides→2.2/4.1).
- Case-study block extraction (3.3) is the riskiest task; plan allows manual Studio fixes over parser perfection.
- Type consistency: block type names (`textSection`, `mediaGrid`, `siteCompSection`, `creditGrid`, `quote`, `videoEmbed`) used consistently across 2.2, 3.3, 4.3.
