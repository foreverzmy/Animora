#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [framesPath, runtimePath, outputPath, movieName, periodInput = "1"] = process.argv.slice(2);

if (!framesPath || !runtimePath || !outputPath || !movieName) {
  console.error("Usage: node build-ffdec-root-runtime.mjs <frames.html> <canvas.js> <output.js> <movie-name> [period]");
  process.exit(2);
}

const period = Number(periodInput);
if (!Number.isInteger(period) || period < 1) throw new Error(`Invalid period: ${periodInput}`);

const framesHtml = fs.readFileSync(framesPath, "utf8");
const rawRuntime = fs.readFileSync(runtimePath, "utf8");
const symbolsEnd = framesHtml.indexOf("var frame = -1;");
const declarationsMarker = "var boundRects = {};";
const declarationsStart = framesHtml.indexOf(declarationsMarker);
const symbolsStart = declarationsStart < 0 ? -1 : declarationsStart + declarationsMarker.length;
if (symbolsStart < 0 || symbolsEnd < 0 || symbolsEnd <= symbolsStart) {
  throw new Error(`Could not locate FFDec symbols in ${framesPath}`);
}

const symbols = framesHtml.slice(symbolsStart, symbolsEnd);
if (!/function main\(/.test(symbols)) throw new Error(`Missing root main() in ${framesPath}`);

const runtime = rawRuntime.replace(
  /window\.addEventListener\('load',[\s\S]*?(?=function drawMorphPath)/,
  ""
);
const imageNames = [...symbols.matchAll(/var (imageObj\d+)\s*=/g)].map((match) => match[1]);
const imageList = imageNames.length ? `[${imageNames.join(",")}]` : "[]";

const bridge = `
var canvas = null;
var ctx = null;
var ctrans = null;
var scalingGrids = {};
var boundRects = {};
var sharedContextState = window.__ffdecRootContextState || (window.__ffdecRootContextState = { enhanced: new WeakSet() });
var images = ${imageList};
var ready = Promise.all(images.map(function (image) {
  if (image.decode) return image.decode().catch(function () {});
  if (image.complete) return Promise.resolve();
  return new Promise(function (resolve) {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
}));

window.FFDecRootMovies = window.FFDecRootMovies || Object.create(null);
window.FFDecRootMovies[${JSON.stringify(movieName)}] = Object.freeze({
  period: ${period},
  ready: ready,
  draw: function (target, time) {
    canvas = target;
    ctx = target.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas 2D is unavailable");
    if (!sharedContextState.enhanced.has(ctx)) {
      enhanceContext(ctx);
      sharedContextState.enhanced.add(ctx);
    }
    if (!ctrans) ctrans = new cxform(0, 0, 0, 0, 255, 255, 255, 255);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    main(ctx, ctrans, 0, 0, time % ${period});
    ctx.restore();
  }
});
`;

const banner = `/* Generated native Canvas vectors from ${path.basename(framesPath)}. Do not hand-edit. */\n`;
const result = `${banner}(function () {\nvar Filters;\n${runtime}\n${symbols}\n${bridge}\n})();\n`;

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(outputPath, result);
console.log(JSON.stringify({
  output: path.resolve(outputPath),
  movieName,
  period,
  images: imageNames.length,
  bytes: Buffer.byteLength(result)
}));
