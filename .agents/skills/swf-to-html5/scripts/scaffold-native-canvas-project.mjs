#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [outputInput, debugName = "movie", sharedInput] = process.argv.slice(2);
if (!outputInput) {
  console.error("Usage: node scaffold-native-canvas-project.mjs <movie-output-dir> [debug-name] [shared-library-dir]");
  process.exit(2);
}

const output = path.resolve(outputInput);
const shared = path.resolve(sharedInput ?? path.join(path.dirname(output), "_shared", "canvas-timeline"));
const template = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "canvas-timeline");
const protectedFiles = ["index.html", "package.json", "tsconfig.json", path.join("src", "animation.ts")];
const conflicts = protectedFiles.filter((file) => fs.existsSync(path.join(output, file)));
if (conflicts.length) throw new Error(`Refusing to overwrite existing project files: ${conflicts.join(", ")}`);

if (!fs.existsSync(shared)) {
  fs.mkdirSync(path.dirname(shared), { recursive: true });
  fs.cpSync(template, shared, { recursive: true, errorOnExist: true });
}
if (!fs.existsSync(path.join(shared, "dist", "index.js")) || !fs.existsSync(path.join(shared, "src", "index.ts"))) {
  throw new Error(`Shared library is incomplete: ${shared}`);
}

fs.mkdirSync(path.join(output, "src"), { recursive: true });
fs.mkdirSync(path.join(output, "dist"), { recursive: true });
fs.mkdirSync(path.join(output, "assets", "timeline"), { recursive: true });

let importPath = path.relative(path.join(output, "src"), shared).split(path.sep).join("/");
if (!importPath.startsWith(".")) importPath = `./${importPath}`;
const safeProperty = `animation${String(debugName).replace(/[^a-zA-Z0-9_$]/g, "_")}`;
const packageName = `swf-${String(debugName).toLowerCase().replace(/[^a-z0-9._-]+/g, "-")}-html5`;

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${debugName} · HTML5 Canvas</title>
  <style>html,body{width:100%;min-height:100%;margin:0;background:#111}canvas{display:block;width:100%;height:auto}</style>
</head>
<body>
  <canvas id="animation" aria-label="${debugName} converted HTML5 animation"></canvas>
  <script type="module" src="dist/animation.js"></script>
</body>
</html>
`;
const animation = `import { CanvasTimelinePlayer } from "${importPath}/dist/index.js";

const canvas = document.querySelector<HTMLCanvasElement>("#animation");
if (!canvas) throw new Error("Missing #animation canvas");
const player = await CanvasTimelinePlayer.create({ canvas, lookaheadFrames: 24 });
(globalThis as unknown as Record<string, unknown>).${safeProperty} = player;
document.addEventListener("pointerdown", () => player.play(), { once: true });
`;
const tsconfig = { compilerOptions: { target: "ES2022", module: "ES2022", moduleResolution: "Bundler", lib: ["ES2022", "DOM"], strict: true, outDir: "dist" }, include: ["src/**/*.ts"] };
const packageJson = { name: packageName, private: true, type: "module", scripts: { build: "tsc -p tsconfig.json" } };

fs.writeFileSync(path.join(output, "index.html"), html);
fs.writeFileSync(path.join(output, "src", "animation.ts"), animation);
fs.writeFileSync(path.join(output, "tsconfig.json"), `${JSON.stringify(tsconfig)}\n`);
fs.writeFileSync(path.join(output, "package.json"), `${JSON.stringify(packageJson)}\n`);
console.log(JSON.stringify({ output, shared, debugApi: safeProperty }, null, 2));
