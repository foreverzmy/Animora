#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const [ffdecInput, webRootInput, ...sourceInputs] = process.argv.slice(2);
if (!ffdecInput || !webRootInput || !sourceInputs.length) {
  console.error("Usage: node batch-native-root-convert.mjs <ffdec.jar> <web-root> <movie.swf> [movie.swf ...]");
  process.exit(2);
}

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const ffdec = path.resolve(ffdecInput);
const webRoot = path.resolve(webRootInput);
const java = process.env.FFDEC_JAVA || "java";
const tsc = process.env.TSC || "/tmp/9-typescript/node_modules/.bin/tsc";
const inspector = path.join(scriptRoot, "inspect-swf.mjs");
const scaffold = path.join(scriptRoot, "scaffold-native-canvas-project.mjs");
const frameBuilder = path.join(scriptRoot, "build-native-frame-manifest.mjs");
const streamExtractor = path.join(scriptRoot, "extract-stream-audio.mjs");
const manifestVerifier = path.join(scriptRoot, "verify-native-manifest.mjs");
const webVerifier = path.join(scriptRoot, "verify-web-output.mjs");
const sublengthMap = JSON.parse(process.env.ROOT_SUBLENGTH_MAP || "{}");
const visualModeMap = JSON.parse(process.env.ROOT_VISUAL_MODE_MAP || "{}");

for (const required of [ffdec, inspector, scaffold, frameBuilder, streamExtractor, manifestVerifier, webVerifier, tsc]) {
  if (!fs.existsSync(required)) throw new Error(`Missing required tool: ${required}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, ...options });
  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    throw new Error(`Command failed (${result.status}): ${command} ${args.join(" ")}`);
  }
  if (options.echo !== false && result.stdout) process.stdout.write(result.stdout);
  return result.stdout;
}

function inspect(source) {
  return JSON.parse(run(process.execPath, [inspector, source], { echo: false }));
}

function filesBelow(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(root, entry.name);
    return entry.isDirectory() ? filesBelow(absolute) : [absolute];
  });
}

function outputName(source) {
  const stem = path.basename(source, path.extname(source));
  return /^\d$/.test(stem) ? stem.padStart(2, "0") : stem;
}

function hasFinalRootStop(report) {
  return report.actions.some((action) => action.location === "root" && action.frame === report.frameCount && action.opcodes.includes("Stop"));
}

function exportEventAudio(source, report, scratch, outputAssets) {
  const referenced = new Set(report.soundStarts.map(({ soundId }) => soundId));
  if (!referenced.size) return null;
  const soundRoot = path.join(scratch, "sounds");
  fs.mkdirSync(soundRoot, { recursive: true });
  run(java, ["-jar", ffdec, "-cli", "-export", "sound", soundRoot, source]);
  const exports = filesBelow(soundRoot).filter((file) => /\.(?:mp3|wav|flac|ogg|aac|m4a)$/i.test(file));
  let selected = exports.length === 1 ? exports[0] : exports.find((file) => [...referenced].some((id) => new RegExp(`(?:^|\\D)${id}(?:\\D|$)`).test(path.basename(file))));
  if (!selected) throw new Error(`Could not map referenced DefineSound IDs ${[...referenced].join(",")} to exports: ${exports.join(", ")}`);
  const extension = path.extname(selected).toLowerCase();
  const target = path.join(outputAssets, `soundtrack${extension}`);
  fs.copyFileSync(selected, target);
  const loops = report.soundStarts.some(({ loopCount }) => Number(loopCount) > 1);
  return { source: `../${path.basename(target)}`, mode: loops ? "loop" : "once", file: target };
}

function exportAudio(source, report, scratch, outputAssets, visualMode) {
  if ((report.recursiveTags.SoundStreamBlock || 0) > 0) {
    const target = path.join(outputAssets, "soundtrack.mp3");
    run(process.execPath, [streamExtractor, source, target]);
    return { source: "../soundtrack.mp3", mode: visualMode === "loop" ? "loop" : "once", file: target };
  }
  return exportEventAudio(source, report, scratch, outputAssets);
}

const batchScratch = fs.mkdtempSync(path.join(os.tmpdir(), "swf-native-root-"));
const results = [];

try {
  for (const sourceInput of sourceInputs) {
    const source = path.resolve(sourceInput);
    const report = inspect(source);
    const name = outputName(source);
    const usesRootSublength = report.frameCount === 1;
    if (usesRootSublength && report.signals.actionTagCount > 0 && process.env.ALLOW_ROOT_ACTIONS !== "1") {
      throw new Error(`${source} has a one-frame root plus ActionScript; inspect behavior before setting ALLOW_ROOT_ACTIONS=1 or use the layer/manual route`);
    }
    const sublengthOverride = Number(sublengthMap[name] || process.env.ROOT_SUBLENGTH_FRAMES || 0);
    const renderFrames = usesRootSublength && sublengthOverride > 0 ? Math.floor(sublengthOverride) : (usesRootSublength ? report.structuralLongestTimelineFrames : report.frameCount);

    const output = path.join(webRoot, name);
    if (fs.existsSync(output)) throw new Error(`Refusing to overwrite existing output: ${output}`);
    const scratch = path.join(batchScratch, name);
    const frameRoot = path.join(scratch, "root");
    fs.mkdirSync(frameRoot, { recursive: true });

    console.log(JSON.stringify({ event: "export-start", name, frames: renderFrames, rootSublength: usesRootSublength, stage: report.stage, fps: report.frameRate }));
    const exportArgs = ["-jar", ffdec, "-cli", "-select", `0:1-${renderFrames}`];
    if (usesRootSublength) exportArgs.push("-sublength", String(renderFrames));
    exportArgs.push("-format", "frame:png", "-export", "frame", frameRoot, source);
    run(java, exportArgs, { echo: false });
    run(process.execPath, [scaffold, output, name]);

    const assets = path.join(output, "assets");
    const visualMode = visualModeMap[name] || (hasFinalRootStop(report) ? "clamp" : "loop");
    if (!new Set(["loop", "clamp"]).has(visualMode)) throw new Error(`Invalid visual mode for ${name}: ${visualMode}`);
    const audio = exportAudio(source, report, scratch, assets, visualMode);
    const manifest = path.join(assets, "timeline", "manifest.json");
    const nestedSublengthRoot = path.join(frameRoot, "1");
    const renderedFrameRoot = usesRootSublength && fs.existsSync(nestedSublengthRoot) ? nestedSublengthRoot : frameRoot;
    run(process.execPath, [
      frameBuilder, renderedFrameRoot, manifest,
      String(report.stage.width), String(report.stage.height), String(report.frameRate), report.stage.background,
      audio?.source || "", audio?.mode || "once", visualMode
    ]);
    run(tsc, ["-p", path.join(output, "tsconfig.json")]);
    run(process.execPath, [manifestVerifier, manifest]);
    run(process.execPath, [webVerifier, output, source, "--native"]);

    const metadata = {
      version: 1,
      source: path.basename(source),
      sourceSha256: crypto.createHash("sha256").update(fs.readFileSync(source)).digest("hex"),
      route: "native-canvas-root-raster-sequence",
      stage: report.stage,
      fps: report.frameRate,
      durationFrames: renderFrames,
      visualMode,
      audio: audio ? { file: path.relative(output, audio.file), mode: audio.mode } : null,
      actionTagsInspected: report.signals.actionTagCount
    };
    fs.writeFileSync(path.join(output, "conversion.json"), `${JSON.stringify(metadata, null, 2)}\n`);
    fs.rmSync(scratch, { recursive: true, force: true });
    results.push({ name, output, frames: renderFrames, visualMode, audio: metadata.audio });
    console.log(JSON.stringify({ event: "export-complete", ...results.at(-1) }));
  }
} finally {
  fs.rmSync(batchScratch, { recursive: true, force: true });
}

console.log(JSON.stringify({ converted: results.length, results }, null, 2));
