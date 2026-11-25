/*
 * Ink for a brand-coloured surface.
 *
 * Case study heroes paint themselves with the project's own brand colour out
 * of Sanity. That surface is mode-independent — it is the same lavender or
 * clay in light and dark — so the text on it cannot use the semantic content
 * tokens, which flip. Doing that is what put near-white type on a pale
 * lavender hero at 1.16:1.
 *
 * So the ink is chosen from the surface's own luminance and locked to a raw
 * palette value. Every brand colour in the dataset today is light and gets
 * the dark ink; the light branch is here so a dark brand colour added later
 * stays readable without anyone remembering this file.
 */

const DARK_INK = "var(--color-slate-900)";
const LIGHT_INK = "var(--color-clay-100)";

/** sRGB channel -> linear, per WCAG 2.1. */
function toLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function parseHex(value: string): [number, number, number] | null {
  const hex = value.replace("#", "").trim();
  const full =
    hex.length === 3 || hex.length === 4
      ? hex
          .slice(0, 3)
          .split("")
          .map((c) => c + c)
          .join("")
      : hex.slice(0, 6);
  if (full.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function parseRgb(value: string): [number, number, number] | null {
  const m = value.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
  return [parts[0], parts[1], parts[2]];
}

function parseHsl(value: string): [number, number, number] | null {
  const m = value.match(/hsla?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  if ([h, s, l].some(Number.isNaN)) return null;
  // HSL -> RGB (CSS Color 4 reference implementation).
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

/**
 * The ink to use on `surface`, as a CSS value. Returns the dark ink when the
 * colour cannot be parsed, since every brand colour in use is light — a
 * readable guess beats an unreadable one.
 */
export function inkOnBrandSurface(surface?: string | null): string {
  if (!surface) return DARK_INK;
  const rgb = parseHex(surface) ?? parseRgb(surface) ?? parseHsl(surface);
  if (!rgb) return DARK_INK;
  // 0.179 is the luminance at which white and black text are equally legible.
  return relativeLuminance(rgb[0], rgb[1], rgb[2]) > 0.179 ? DARK_INK : LIGHT_INK;
}
