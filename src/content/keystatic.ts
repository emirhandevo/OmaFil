import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import bundled from "./bundled-content.json";

function hasHero(root: string) {
  return fs.existsSync(path.join(root, "content/settings/hero.yaml"));
}

/** Vercel lambda’da content/ yoksa gömülü YAML’i /tmp’ye yazar. */
function repoRoot(): string {
  if (hasHero(process.cwd())) return process.cwd();

  const root = path.join(os.tmpdir(), "omafil-keystatic");
  const files = bundled as Record<string, string>;
  for (const [rel, body] of Object.entries(files)) {
    if (rel.startsWith("_")) continue;
    const dest = path.join(root, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, body);
  }
  return hasHero(root) ? root : process.cwd();
}

/** Tek reader — blog, sayfalar, singleton’lar */
export const reader = createReader(repoRoot(), keystaticConfig);
