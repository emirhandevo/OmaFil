#!/usr/bin/env node
/**
 * content/*.yaml|json → tek JSON.
 * Vercel fonksiyonunda process.cwd() altında content yok; build bunu gömer.
 */
import fs from "node:fs";
import path from "node:path";

const repo = process.cwd();
const contentDir = path.join(repo, "content");
const outFile = path.join(repo, "src/content/bundled-content.json");
const files = {};

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(ya?ml|json)$/i.test(ent.name)) continue;
    const rel = path.relative(repo, full).split(path.sep).join("/");
    files[rel] = fs.readFileSync(full, "utf8");
  }
}

if (!fs.existsSync(contentDir)) {
  console.error("content/ yok");
  process.exit(1);
}

walk(contentDir);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(files));
console.log(`keystatic bundle: ${Object.keys(files).length} dosya`);
