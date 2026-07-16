# mattplays.co Rebuild — Design Spec

**Date:** 2026-07-15
**Status:** Awaiting approval
**Tracking:** Linear — [Work & Portfolio](https://linear.app/mattplays/project/work-and-portfolio-04303ac42ca8)

## Goal

Rebuild mattplays.co (currently Webflow-hosted) as a Next.js site with all
content-managed collections — Projects, Changelog Updates, Blog Posts — editable
in Sanity. Mirror the current site 1:1 first; the domain stays on Webflow until
parity is verified, then DNS cuts over to Vercel.

## Stack & architecture

- **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind** — same shape as
  the sarah-and-matt project.
- **Sanity** for content, with the **Studio embedded at `/studio`** in the same
  app. One repo, one Vercel deploy.
- **Repo strategy:** build on a branch in the existing `mattplays.co` repo;
  replace `main` when ready. Old code remains in git history.
- **Rendering:** static generation. A Sanity webhook triggers on-demand
  revalidation (`revalidateTag`) so publishing in the Studio updates the live
  site without a redeploy. Next.js draft mode for previewing unpublished content.
- **Analytics:** Vercel Analytics (replacing Google Analytics).

## Sanity content model

Four document types:

### `project`
Title, slug, description, fields/roles, project color, hero visual,
primary/secondary thumbnails, order, SEO fields, and a **page-builder `body`**:
an array of block types modeled on the existing case study components —
text section, media/image grid, site-comp section, credit grid, quote, video.
New case studies become a Studio-only task. The drafted "Help Scout Marketing
Site" project imports as a Sanity draft.

### `changelogEntry`
Title, slug, date, image, rich-text body (Portable Text). 12 entries.

### `blogPost`
Title, slug, date, summary, body, images, featured flag, color. ~60 posts
imported from the Webflow CSV (originally Squarespace). **Editable in Sanity but
not rendered publicly** — matches the current site. Public blog is a backlog item.

### `siteSettings` (singleton)
Promo bar (including per-page override behavior), nav links, footer links,
socials.

The Info page and Style Guide remain code-owned for v1 (one-off pages, not
collections).

## Content migration

One-time migration scripts, kept in the repo (`scripts/migrate/`):

1. Parse the three CSV exports; convert rich-text HTML → Portable Text.
   Clean residual Squarespace artifacts in blog post HTML (stray escaped
   `<img>` tags in figcaptions, empty paragraphs).
2. **Eliminate the Webflow CDN dependency:** download every referenced asset
   (from the export zip where present, otherwise from the live Webflow CDN) and
   upload to Sanity as image assets. Content must reference only Sanity's CDN
   after migration. Fallback source for anything unrecoverable:
   `~/Library/CloudStorage/Dropbox/Personal/2025/Portfolio/Deliverables`
   (contains source deliverables for Delight Labs, Footer, Home, Island of
   Misfit Work, Rock Dove). Known gap: `HelpScout-DelightLabs-11-p-2600.jpg`
   failed the Webflow export — pull from live CDN or Dropbox.
3. **Case studies:** parse the 13 exported `work/*.html` pages and reconstruct
   each as structured page-builder content in Sanity. Verify side-by-side
   against the live site.
4. Import via `sanity dataset import` (NDJSON).

Static site assets (fonts, logos, favicons, site chrome) go into `/public` from
the export zip. Fonts (Sharp Grotesk Semibold 23, Söhne Buch, Söhne Mono) are
self-hosted; licensing confirmed by Matt.

## Pages

Same URLs as today — no redirects needed.

| Route | Source | Notes |
|---|---|---|
| `/` | code + Sanity | homepage collage, project links, promo bar |
| `/work` | Sanity | project grid from `project` docs |
| `/work/[slug]` | Sanity | 13 case studies via page-builder blocks |
| `/changelog` | Sanity | list of `changelogEntry` docs |
| `/info` | code | bio, photos, lists, colophon, press mentions anchors |
| `/style-guide` | code | open-sourced style guide |
| `/shop` | code | "Coming soon!" placeholder page |
| `/news` | code | ported as-is from export |
| `/test`, `/hero-sketch` | code | ported as-is (unlinked utility pages) |
| `/lp/creative-south-2025` | code | landing page, ported as-is |
| `/404` | code | custom 404 page from the export (401 page skipped — it exists only for Webflow's password-protection feature, which the new site doesn't use) |
| `/studio` | Sanity Studio | editing UI |

All Webflow pages are kept — nothing dropped.

Site behaviors reimplemented in React/CSS: page load/transition animations,
h1 hover interaction, project list navigation component, coming-soon tooltips
on nav/footer links, promo bar with changelog-aware link hiding, responsive
fluid type & space scale, >1600w large-screen scaling.

Hygiene: per-page meta/OG tags, `sitemap.xml`, `robots.txt`, favicons.

## RSS

- **v1 groundwork:** `/changelog/rss.xml` route rendering the changelog feed
  (cheap to build once content is in Sanity).
- **Backlog (Linear):** blog RSS — deferred until the blog is public.

## Cutover plan

1. Build and iterate on Vercel preview URLs; Webflow stays live and untouched.
2. Side-by-side parity pass on every page (browser-driven comparison against
   the live site).
3. Replace `main` with the new build; production deploy on the Vercel project.
4. Matt points DNS web records to Vercel. **MX/email records untouched**
   (matt@mattplays.co rides on this domain).
5. Keep Webflow paused-but-alive for ~2 weeks as fallback, then cancel.
   All assets must already be off Webflow's CDN by this point.

## Dependencies / access

- **Sanity:** Matt runs `sanity login` (or creates the project); project ID,
  dataset, and API tokens go into Vercel env vars + `.env.local`.
- **Dropbox:** local path available for source assets (see above).
- **Linear:** backlog and fast-follows tracked in the Work & Portfolio project.
  Optional: install the Claude agent integration in Linear to make Claude
  assignable.

## Out of scope (v1)

- Public blog pages (import only)
- Blog RSS
- Any domain/DNS changes before parity sign-off
- Webflow content redesign — this is a mirror, not a redesign
