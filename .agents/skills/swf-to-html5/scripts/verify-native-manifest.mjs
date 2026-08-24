#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const manifestInput = process.argv[2];
if (!manifestInput) {
  console.error("Usage: node verify-native-manifest.mjs <manifest.json>");
  process.exit(2);
}

function pngSize(file) {
  const data = fs.readFileSync(file);
  if (data.toString("ascii", 1, 4) !== "PNG") throw new Error(`Not a PNG: ${file}`);
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

const manifestPath = path.resolve(manifestInput);
const root = path.dirname(manifestPath);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const warnings = [];
const stats = { sequences: 0, layers: 0, frames: 0, bytes: 0 };
const isSymbolManifest = manifest.symbols && typeof manifest.symbols === "object" && !manifest.sequences;

function verifyAsset(frame, label, requireOrigin = false) {
  stats.frames += 1;
  if (typeof frame.src !== "string" || !frame.src || path.isAbsolute(frame.src) || /^[a-z]+:/i.test(frame.src)) {
    errors.push(`${label}: asset path must be relative`);
    return null;
  }
  const asset = path.resolve(root, frame.src);
  if (!asset.startsWith(`${root}${path.sep}`)) {
    errors.push(`${label}: asset escapes the manifest tree: ${frame.src}`);
    return null;
  }
  if (!fs.existsSync(asset)) {
    errors.push(`${label}: missing ${frame.src}`);
    return null;
  }
  stats.bytes += fs.statSync(asset).size;
  const actual = pngSize(asset);
  if (!Array.isArray(frame.size) || frame.size[0] !== actual[0] || frame.size[1] !== actual[1]) errors.push(`${label}: declared size differs from PNG`);
  if (requireOrigin && (!Array.isArray(frame.origin) || frame.origin.length !== 2 || !frame.origin.every(Number.isFinite))) errors.push(`${label}: needs a finite origin`);
  return actual;
}

if (manifest.version !== 1) errors.push(`Unsupported manifest version: ${manifest.version}`);
if (isSymbolManifest) {
  for (const [name, frames] of Object.entries(manifest.symbols)) {
    stats.sequences += 1;
    if (!Array.isArray(frames) || !frames.length) {
      errors.push(`${name}: no frames`);
      continue;
    }
    for (const [index, frame] of frames.entries()) verifyAsset(frame, `${name}[${index}]`, true);
  }
  if (!Array.isArray(manifest.layout42) || !manifest.layout42.length) {
    errors.push("Missing layout42");
  } else {
    for (const [frameIndex, placements] of manifest.layout42.entries()) {
      if (!Array.isArray(placements)) {
        errors.push(`layout42[${frameIndex}]: expected an array`);
        continue;
      }
      for (const [placementIndex, placement] of placements.entries()) {
        if (!manifest.symbols[String(placement.id)]) errors.push(`layout42[${frameIndex}][${placementIndex}]: unknown symbol ${placement.id}`);
        if (!Array.isArray(placement.matrix) || placement.matrix.length !== 6 || !placement.matrix.every(Number.isFinite)) errors.push(`layout42[${frameIndex}][${placementIndex}]: invalid matrix`);
      }
    }
  }
} else {
  for (const field of ["width", "height"]) {
    if (!Number.isFinite(manifest.stage?.[field]) || manifest.stage[field] <= 0) errors.push(`Invalid stage.${field}`);
  }
  if (!Number.isFinite(manifest.fps) || manifest.fps <= 0) errors.push("Invalid fps");
  if (!Number.isInteger(manifest.durationFrames) || manifest.durationFrames <= 0) errors.push("Invalid durationFrames");
  if (!manifest.sequences || typeof manifest.sequences !== "object") errors.push("Missing sequences object");
  if (!Array.isArray(manifest.layers) || !manifest.layers.length) errors.push("Missing layers");
}

for (const [name, sequence] of Object.entries(manifest.sequences ?? {})) {
  stats.sequences += 1;
  if (!new Set(["pixels", "flash"]).has(sequence.space)) errors.push(`${name}: invalid coordinate space`);
  if (!Array.isArray(sequence.frames) || !sequence.frames.length) {
    errors.push(`${name}: no frames`);
    continue;
  }
  for (const [index, frame] of sequence.frames.entries()) {
    const actual = verifyAsset(frame, `${name}[${index}]`, sequence.space === "flash");
    if (!actual) continue;
    if (sequence.space === "pixels" && (actual[0] !== manifest.stage.width || actual[1] !== manifest.stage.height)) errors.push(`${name}[${index}]: pixel-space frame must match the stage`);
  }
}

for (const [index, layer] of (manifest.layers ?? []).entries()) {
  stats.layers += 1;
  if (!manifest.sequences?.[layer.sequence]) errors.push(`layer[${index}]: unknown sequence ${layer.sequence}`);
  if (layer.mode && !new Set(["loop", "clamp"]).has(layer.mode)) errors.push(`layer[${index}]: invalid mode ${layer.mode}`);
  if (layer.matrix && (!Array.isArray(layer.matrix) || layer.matrix.length !== 6 || !layer.matrix.every(Number.isFinite))) errors.push(`layer[${index}]: invalid matrix`);
}

if (manifest.audio) {
  if (typeof manifest.audio.src !== "string" || path.isAbsolute(manifest.audio.src) || /^[a-z]+:/i.test(manifest.audio.src)) {
    errors.push("audio.src must be relative");
  } else {
    const audio = path.resolve(root, manifest.audio.src);
    if (!audio.startsWith(`${root}${path.sep}`)) warnings.push(`audio is outside the timeline directory but remains inside the movie output only if intentionally placed there: ${manifest.audio.src}`);
    if (!fs.existsSync(audio)) errors.push(`missing audio: ${manifest.audio.src}`);
  }
}

const result = { manifest: manifestPath, passed: errors.length === 0, stats, warnings, errors };
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.passed ? 0 : 1;
