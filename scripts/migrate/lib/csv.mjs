import fs from "node:fs";
import { parse } from "csv-parse/sync";

export function readCsv(file) {
  return parse(fs.readFileSync(file, "utf8"), {
    columns: true,
    skip_empty_lines: true,
  });
}

export function parseWebflowDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}
