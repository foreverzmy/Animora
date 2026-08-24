#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [pngRoot, svgRoot, framesHtmlPath, outputRoot] = process.argv.slice(2);
if (!pngRoot || !svgRoot || !framesHtmlPath || !outputRoot) {
  console.error("Usage: node build-png-timeline-assets.mjs <sprite-png-dir> <sprite-svg-dir> <frames.html> <output-dir>");
  process.exit(2);
}

const symbolIds = [4, 13, 15, 17, 19, 21, 23, 25, 27, 30, 31, 34, 36, 38, 40];
const layoutChildren = new Set([15, 17, 19, 21, 23, 25, 27, 30, 31]);

function pngSize(file) {
  const data = fs.readFileSync(file);
  if (data.toString("ascii", 1, 4) !== "PNG") throw new Error(`Not a PNG: ${file}`);
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

function frameNumbers(directory) {
  return fs.readdirSync(directory)
    .map((name) => Number.parseInt(name, 10))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
}

function svgOrigin(file) {
  const source = fs.readFileSync(file, "utf8");
  const match = source.match(/<g transform="matrix\(1\.0, 0\.0, 0\.0, 1\.0, ([-0-9.]+), ([-0-9.]+)\)"/);
  if (!match) throw new Error(`Missing outer SVG origin: ${file}`);
  return [Number(match[1]), Number(match[2])];
}

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Missing ${name}`);
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unbalanced ${name}`);
}

const manifest = { version: 1, symbols: {}, layout42: [] };
if (fs.existsSync(outputRoot) && fs.readdirSync(outputRoot).length > 0) {
  throw new Error(`Output directory must be empty: ${outputRoot}`);
}
fs.mkdirSync(outputRoot, { recursive: true });

for (const id of symbolIds) {
  const pngDirectory = path.join(pngRoot, `DefineSprite_${id}`);
  const svgDirectory = path.join(svgRoot, `DefineSprite_${id}`);
  const targetDirectory = path.join(outputRoot, `s${id}`);
  fs.mkdirSync(targetDirectory, { recursive: true });

  const frames = frameNumbers(pngDirectory).map((number) => {
    const png = path.join(pngDirectory, `${number}.png`);
    const svg = path.join(svgDirectory, `${number}.svg`);
    const targetName = `${String(number).padStart(3, "0")}.png`;
    fs.copyFileSync(png, path.join(targetDirectory, targetName));
    const [width, height] = pngSize(png);
    return { src: `s${id}/${targetName}`, size: [width, height], origin: svgOrigin(svg) };
  });
  manifest.symbols[id] = frames;
}

const sprite42 = extractFunction(fs.readFileSync(framesHtmlPath, "utf8"), "sprite42");
let currentFrame = -1;
for (const line of sprite42.split("\n")) {
  const caseMatch = line.match(/case (\d+):/);
  if (caseMatch) {
    currentFrame = Number(caseMatch[1]);
    manifest.layout42[currentFrame] = [];
    continue;
  }
  const placeMatch = line.match(/place\("sprite(\d+)"[^\[]*(\[[^\]]+\])/);
  if (!placeMatch || currentFrame < 0) continue;
  const id = Number(placeMatch[1]);
  if (layoutChildren.has(id)) {
    manifest.layout42[currentFrame].push({ id, matrix: JSON.parse(placeMatch[2]) });
  }
}

fs.writeFileSync(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest)}\n`);
console.log(JSON.stringify({ output: path.resolve(outputRoot), symbols: symbolIds.length, files: Object.values(manifest.symbols).reduce((sum, frames) => sum + frames.length, 0) }, null, 2));
