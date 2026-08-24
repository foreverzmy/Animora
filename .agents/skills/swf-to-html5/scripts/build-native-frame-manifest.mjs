#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [frameDirectory, outputFile, widthText, heightText, fpsText, background = "#000000", audioSource = "", audioMode = "once", visualMode = "loop"] = process.argv.slice(2);
if (!frameDirectory || !outputFile || !widthText || !heightText || !fpsText) {
  console.error("Usage: node build-native-frame-manifest.mjs <frame-dir> <manifest.json> <width> <height> <fps> [background] [audio-src] [once|loop] [loop|clamp]");
  process.exit(2);
}
if (!new Set(["once", "loop"]).has(audioMode)) throw new Error(`Invalid audio mode: ${audioMode}`);
if (!new Set(["loop", "clamp"]).has(visualMode)) throw new Error(`Invalid visual mode: ${visualMode}`);

function pngSize(file) {
  const data = fs.readFileSync(file);
  if (data.toString("ascii", 1, 4) !== "PNG") throw new Error(`Not a PNG: ${file}`);
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

const width = Number(widthText);
const height = Number(heightText);
const fps = Number(fpsText);
if (![width, height, fps].every((value) => Number.isFinite(value) && value > 0)) throw new Error("Stage width, height, and FPS must be positive numbers");

const sourceRoot = path.resolve(frameDirectory);
const manifestPath = path.resolve(outputFile);
const targetRoot = path.join(path.dirname(manifestPath), "root");
const numbers = fs.readdirSync(sourceRoot)
  .filter((name) => /^\d+\.png$/.test(name))
  .map((name) => Number.parseInt(name, 10))
  .sort((a, b) => a - b);
if (!numbers.length) throw new Error(`No numbered PNG frames: ${sourceRoot}`);
for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] !== index + 1) throw new Error(`Frame sequence must be contiguous from 1; expected ${index + 1}, got ${numbers[index]}`);
}

fs.mkdirSync(targetRoot, { recursive: true });
const frames = numbers.map((number) => {
  const name = `${number}.png`;
  const source = path.join(sourceRoot, name);
  const size = pngSize(source);
  if (size[0] !== width || size[1] !== height) throw new Error(`Frame ${name} is ${size.join("x")}; expected ${width}x${height}`);
  const target = path.join(targetRoot, name);
  if (source !== target) fs.copyFileSync(source, target);
  return { src: `root/${name}`, size };
});

const manifest = {
  version: 1,
  stage: { width, height, background },
  fps,
  durationFrames: frames.length,
  sequences: { root: { space: "pixels", frames } },
  layers: [{ sequence: "root", mode: visualMode }],
  ...(audioSource ? { audio: { src: audioSource, loop: audioMode === "loop" } } : {})
};
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest)}\n`);
console.log(JSON.stringify({ output: manifestPath, frames: frames.length, copiedTo: targetRoot }));
