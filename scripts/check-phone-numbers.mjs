#!/usr/bin/env node
/**
 * NAP guard: fails the build if a known-wrong Autoklinik Reutlingen main
 * phone number variant re-enters the codebase.
 *
 * The single source of truth for the main phone number is `lib/site-config.ts`
 * (SITE.phone). This script does not replace that config — it only protects
 * against regressions where someone re-hardcodes an old/incorrect number
 * instead of importing SITE.phone.
 *
 * Run manually: node scripts/check-phone-numbers.mjs
 * Runs automatically before `npm run build` (see package.json "prebuild").
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();

// Known-wrong variants of the Autoklinik main number that must never appear
// again anywhere in the shipped source. Correct value: 07121 14526199 /
// +49712114526199.
const FORBIDDEN = [
  "15526199",
  "14526190",
  "0712115526199",
  "0712114526190",
  "+49712115526199",
  "+49712114526190",
  // Extra guards for variants found during the 2026-09 audit:
  "07121 15526199",
  "07121 14526190",
  "+49 7121 15526199",
  "+49 7121 14526190",
  "988 6660", // old wrong number that leaked into blog content + chatbot prompt
  "07121988 6660",
];

// Directories to scan. Deliberately excludes node_modules, .next, public
// (static legacy mirror/vendor assets), and read-only context dirs.
const SCAN_DIRS = ["app", "components", "lib"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const SKIP_DIR_NAMES = new Set(["node_modules", ".next", ".git"]);

/** @param {string} dir */
function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIR_NAMES.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (SCAN_EXT.has(extname(entry.name))) {
      yield full;
    }
  }
}

let violations = [];

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  try {
    statSync(abs);
  } catch {
    continue;
  }
  for (const file of walk(abs)) {
    // lib/site-config.ts intentionally documents the correct number; the
    // forbidden list above contains no substring of the correct number,
    // so no allowlist exception is needed there.
    const content = readFileSync(file, "utf8");
    for (const bad of FORBIDDEN) {
      if (content.includes(bad)) {
        violations.push({ file: file.replace(ROOT + "/", ""), bad });
      }
    }
  }
}

if (violations.length > 0) {
  console.error("\n✖ Phone-number NAP guard failed.\n");
  console.error(
    "The following files contain a known-incorrect Autoklinik Reutlingen phone number.",
  );
  console.error(
    "The only correct number is 07121 14526199 (tel: +49712114526199) — always import it from lib/site-config.ts (SITE.phone).\n",
  );
  for (const v of violations) {
    console.error(`  - ${v.file}: contains "${v.bad}"`);
  }
  console.error("");
  process.exit(1);
} else {
  console.log("✓ Phone-number NAP guard passed — no forbidden number variants found.");
}
