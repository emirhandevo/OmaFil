import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

// public altındaki resim, video ve maske. İçerik değişince hash değişir.
// Panel hâlâ /images/... yazar. Ekrana giden kopya public/a/<hash>/dosya olur.
const roots = ["images", "videos", "masks"];
const publicDir = path.join(process.cwd(), "public");
const outRoot = path.join(publicDir, "a");
const mapFile = path.join(process.cwd(), "src/generated/asset-map.ts");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

const map = {};

await rm(outRoot, { recursive: true, force: true });

for (const root of roots) {
  const abs = path.join(publicDir, root);
  const files = await walk(abs);
  for (const file of files) {
    const bytes = await readFile(file);
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 10);
    const base = path.basename(file);
    const relKey = `/${path.relative(publicDir, file).split(path.sep).join("/")}`;
    const url = `/a/${hash}/${base}`;
    map[relKey] = url;
    const dest = path.join(outRoot, hash, base);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, bytes);
  }
}

const lines = Object.keys(map)
  .sort()
  .map((key) => `  ${JSON.stringify(key)}: ${JSON.stringify(map[key])},`)
  .join("\n");

await mkdir(path.dirname(mapFile), { recursive: true });
await writeFile(
  mapFile,
  `// scripts/fingerprint-assets.mjs üretir. Elle düzenleme.\nexport const assetMap: Record<string, string> = {\n${lines}\n};\n`,
);

console.log(`fingerprint: ${Object.keys(map).length} dosya`);
