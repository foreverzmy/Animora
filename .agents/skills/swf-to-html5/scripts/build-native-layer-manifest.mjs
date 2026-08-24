#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const [framesHtml, spritePngRoot, spriteSvgRoot, shapePngRoot, shapeSvgRoot, outputRoot, widthText, heightText, fpsText, durationText, clampText = "", background = "#000000", audioSource = "", sublengthText = "", audioMode = "once"] = process.argv.slice(2);
if (!framesHtml || !spritePngRoot || !spriteSvgRoot || !shapePngRoot || !shapeSvgRoot || !outputRoot || !widthText || !heightText || !fpsText || !durationText) { console.error("Usage: node build-native-layer-manifest.mjs <frames.html> <sprite-png> <sprite-svg> <shape-png> <shape-svg> <output-dir> <width> <height> <fps> <duration> [clamp-ids] [background] [audio-src] [sublength-ids] [once|loop]"); process.exit(2); }
if (!new Set(["once", "loop"]).has(audioMode)) throw new Error(`Invalid audio mode: ${audioMode}`);
function pngSize(file) { const data = fs.readFileSync(file); if (data.toString("ascii", 1, 4) !== "PNG") throw new Error(`Not a PNG: ${file}`); return [data.readUInt32BE(16), data.readUInt32BE(20)]; }
function svgOrigin(file) { const source = fs.readFileSync(file, "utf8"); const match = source.match(/<g transform="matrix\(1\.0, 0\.0, 0\.0, 1\.0, ([-+0-9.Ee]+), ([-+0-9.Ee]+)\)"/); if (!match) throw new Error(`Missing outer SVG origin: ${file}`); return [Number(match[1]), Number(match[2])]; }
function numericFiles(directory, extension) { return fs.readdirSync(directory).filter((name) => new RegExp(`^\\d+\\.${extension}$`).test(name)).map((name) => Number.parseInt(name, 10)).sort((a, b) => a - b); }
const source = fs.readFileSync(framesHtml, "utf8");
const mainStart = source.indexOf("function main("); const mainEnd = source.indexOf("var frame = -1", mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error("Missing FFDec Canvas main function");
const main = source.slice(mainStart, mainEnd);
if (/\bclips\.(?:push|pop)\b|clipDepth/.test(main)) throw new Error("Top-level masks/clips require a manual renderer; the generic layer manifest cannot preserve them");
const placementPattern = /place\("(sprite|shape)(\d+)"[^\[]*(\[[^\]]+\]),(.+?),(\d+),(?:\(([-+]?\d+)\+time\)%\d+|0),\s*0,time\);/g;
const placements = [...main.matchAll(placementPattern)].map((match) => ({
  kind: match[1],
  id: Number(match[2]),
  matrix: JSON.parse(match[3]),
  colorTransform: match[4].trim(),
  blendMode: Number(match[5]),
  offset: Number(match[6] ?? 0)
}));
const rawCount = [...main.matchAll(/\bplace\(/g)].length;
if (placements.length !== rawCount) throw new Error(`Parsed ${placements.length}/${rawCount} top-level placements`);
const unsupported = placements.filter(({ colorTransform, blendMode }) => colorTransform !== "ctrans" || blendMode !== 1);
if (unsupported.length) throw new Error(`Generic layer manifest cannot preserve ${unsupported.length} top-level color-transform/blend placement(s); use a manual renderer or root raster sequence`);
const clampIds = new Set(clampText.split(",").filter(Boolean).map(Number));
const sublengthIds = new Set(sublengthText.split(",").filter(Boolean).map(Number));
const sequences = {};
fs.mkdirSync(outputRoot, { recursive: true });
for (const { kind, id } of placements) {
  const key = `${kind}${id}`; if (sequences[key]) continue;
  const isSprite = kind === "sprite";
  const spriteSuffix = sublengthIds.has(id) ? path.join(`DefineSprite_${id}`, "1") : `DefineSprite_${id}`;
  const pngDirectory = isSprite ? path.join(spritePngRoot, spriteSuffix) : shapePngRoot;
  const svgDirectory = isSprite ? path.join(spriteSvgRoot, spriteSuffix) : shapeSvgRoot;
  const numbers = isSprite ? numericFiles(pngDirectory, "png") : [id];
  if (!numbers.length) throw new Error(`No PNG frames for ${key}: ${pngDirectory}`);
  if (isSprite) numbers.forEach((number, index) => { if (number !== index + 1) throw new Error(`${key} frames must be contiguous from 1; expected ${index + 1}, got ${number}`); });
  const targetDirectory = path.join(outputRoot, key); fs.mkdirSync(targetDirectory, { recursive: true });
  const frames = numbers.map((number) => { const targetName = `${String(number).padStart(4, "0")}.png`; const png = path.join(pngDirectory, `${number}.png`); const svg = path.join(svgDirectory, `${number}.svg`); fs.copyFileSync(png, path.join(targetDirectory, targetName)); return { src: `${key}/${targetName}`, size: pngSize(png), origin: svgOrigin(svg) }; });
  sequences[key] = { space: "flash", frames };
}
const layers = placements.map(({ kind, id, matrix, offset }) => ({ sequence: `${kind}${id}`, matrix, ...(offset ? { offset } : {}), mode: clampIds.has(id) ? "clamp" : "loop" }));
const manifest = { version: 1, stage: { width: Number(widthText), height: Number(heightText), background }, fps: Number(fpsText), durationFrames: Number(durationText), sequences, layers, ...(audioSource ? { audio: { src: audioSource, loop: audioMode === "loop" } } : {}) };
fs.writeFileSync(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest)}\n`);
console.log(JSON.stringify({ output: path.resolve(outputRoot), sequences: Object.keys(sequences).length, layers: layers.length }));
