#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [framesPath, runtimePath, outputPath] = process.argv.slice(2);

if (!framesPath || !runtimePath || !outputPath) {
  console.error("Usage: node build-ffdec-canvas-assets.mjs <frames.html> <canvas.js> <output.js>");
  process.exit(2);
}

const framesHtml = fs.readFileSync(framesPath, "utf8");
const rawRuntime = fs.readFileSync(runtimePath, "utf8");

function extractFunction(source, name) {
  const marker = `function ${name}(`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${name} in ${framesPath}`);

  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unbalanced function ${name}`);
}

function makeSprite42Variant(name, keepPlace) {
  return extractFunction(framesHtml, "sprite42")
    .replace("function sprite42(", `function ${name}(`)
    .split("\n")
    .filter((line) => !line.includes("place(\"") || keepPlace(line))
    .join("\n");
}

const symbolsStart = framesHtml.indexOf("function shape1(");
const symbolsEnd = framesHtml.indexOf("var frame = -1;");
if (symbolsStart < 0 || symbolsEnd < 0) {
  throw new Error("Could not locate the FFDec symbol section");
}

const symbols = framesHtml.slice(symbolsStart, symbolsEnd);
const runtime = rawRuntime.replace(
  /window\.addEventListener\('load',[\s\S]*?(?=function drawMorphPath)/,
  ""
);
const below = makeSprite42Variant(
  "sprite42BaseBelow",
  (line) => !/place\("(?:sprite35|sprite37|sprite39|sprite41|sprite30)"/.test(line)
);
const top = makeSprite42Variant(
  "sprite42BaseTop",
  (line) => /place\("sprite30"/.test(line)
);

const bridge = String.raw`
var canvas = null;
var ctx = null;
var ctrans = null;
var scalingGrids = {};
var boundRects = {};

window.CanvasVectors = Object.freeze({
  init: function (target) {
    canvas = target;
    ctx = target.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D is unavailable");
    enhanceContext(ctx);
    ctrans = new cxform(0, 0, 0, 0, 255, 255, 255, 255);
  },
  begin: function () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
  draw: function (name, matrix, frame) {
    place(name, canvas, ctx, matrix, ctrans, 1, frame, 0, 0);
  }
});
`;

const banner = `/* Generated from FFDec Canvas export. Do not hand-edit vector paths. */\n`;
const result = `${banner}${runtime}\n${bridge}\n${symbols}\n${below}\n${top}\n`;

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(outputPath, result);
console.log(JSON.stringify({ output: path.resolve(outputPath), bytes: Buffer.byteLength(result) }, null, 2));
