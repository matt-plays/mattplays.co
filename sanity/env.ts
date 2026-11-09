/*
 * Sanity project coordinates.
 *
 * The project id and dataset name are public identifiers, not secrets: they
 * are NEXT_PUBLIC_*, so they ship to the browser in every query the client
 * makes, and sanity.cli.ts has carried the same literals in-repo all along.
 * Defaulting to them here means a fresh clone or worktree renders the whole
 * site with no .env.local — which is what previewing locally needs.
 *
 * Vercel's own env vars still win when they are set, so nothing changes about
 * how the deployed site resolves these.
 *
 * Anything that WRITES to Sanity needs a real credential and so is not
 * defaulted: see SANITY_API_WRITE_TOKEN in .env.example, used only by the
 * one-off scripts under scripts/migrate.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nexjv4lx";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-07-15";
