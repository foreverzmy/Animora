#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node analyze-ffdec-canvas-root.mjs <frames.html>");
  process.exit(2);
}

const source = fs.readFileSync(input, "utf8");
const mainStart = source.indexOf("function main(");
const mainEnd = source.indexOf("var frame = -1", mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error("Missing unpacked FFDec Canvas main function; export with -config packJavaScripts=false");
const main = source.slice(mainStart, mainEnd);
const placements = [];
const pattern = /place\("(sprite|shape|button)(\d+)"\s*,canvas,ctx,(\[[^\]]+\]),(.+?),(\d+),(?:\(([-+]?\d+)\+time\)%(\d+)|0),\s*0,time\);/g;

for (const match of main.matchAll(pattern)) {
  placements.push({
    kind: match[1],
    id: Number(match[2]),
    matrix: JSON.parse(match[3]),
    colorTransform: match[4].trim(),
    blendMode: Number(match[5]),
    offset: Number(match[6] || 0),
    period: Number(match[7] || 1)
  });
}

const rawCount = [...main.matchAll(/\bplace\(/g)].length;
if (placements.length !== rawCount) throw new Error(`Parsed ${placements.length}/${rawCount} root placements`);
const unique = [...new Map(placements.map((placement) => [`${placement.kind}${placement.id}`, placement])).values()];
const result = {
  input: path.resolve(input),
  placementCount: placements.length,
  uniqueCount: unique.length,
  maxVisiblePeriod: Math.max(1, ...placements.map(({ period }) => period)),
  hasTopLevelMasks: /\bclips\.(?:push|pop)\b|clipDepth/.test(main),
  nonDefaultColorTransforms: placements.filter(({ colorTransform }) => colorTransform !== "ctrans").length,
  nonDefaultBlendModes: placements.filter(({ blendMode }) => blendMode !== 1).length,
  unique: unique.map(({ kind, id, period, colorTransform, blendMode }) => ({ kind, id, period, colorTransform, blendMode })),
  placements
};

console.log(JSON.stringify(result, null, 2));
