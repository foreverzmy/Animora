#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("--"));
const outputDir = positional[0];
const sourceSwf = positional[1];
const nativeOnly = args.includes("--native");

if (!outputDir) {
  console.error("Usage: node verify-web-output.mjs <web-directory> [source.swf] [--native]");
  process.exit(2);
}

const root = path.resolve(outputDir);
const indexPath = path.join(root, "index.html");
const checks = [];

function check(name, passed, evidence) {
  checks.push({ name, passed, evidence });
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

check("index.html exists", fs.existsSync(indexPath), indexPath);

const files = walk(root);
const relativeFiles = files.map((file) => path.relative(root, file));
const html = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";
const swfFiles = files.filter((file) => file.toLowerCase().endsWith(".swf"));
const wasmFiles = files.filter((file) => file.toLowerCase().endsWith(".wasm"));
const usesRuffle = /RufflePlayer|ruffle\.js/i.test(html);
const usesCanvas = /<canvas\b/i.test(html) || /canvas\.js|animation\.js/i.test(html);
const externalRuntime = /<(?:script|audio|source|img)[^>]+(?:src|href)=["']https?:\/\//i.test(html);

check("an animation route is present", usesRuffle || usesCanvas, usesRuffle ? "Ruffle" : usesCanvas ? "Canvas" : "none detected");

if (nativeOnly) {
  check("native route uses Canvas", usesCanvas, usesCanvas ? "Canvas detected" : "Canvas not detected");
  check("native route does not load Ruffle", !usesRuffle, usesRuffle ? "Ruffle reference found" : "none");
  check("native route bundles no SWF", swfFiles.length === 0, swfFiles.map((file) => path.relative(root, file)).join(", ") || "none");
  check("native route bundles no WASM", wasmFiles.length === 0, wasmFiles.map((file) => path.relative(root, file)).join(", ") || "none");
  check("native route has no external runtime", !externalRuntime, externalRuntime ? "external URL found" : "self-contained");
  check("TypeScript source is retained", relativeFiles.some((file) => file.toLowerCase().endsWith(".ts")), "Expected editable .ts source");
}

if (usesRuffle) {
  check("SWF asset is bundled", swfFiles.length > 0, swfFiles.map((file) => path.relative(root, file)).join(", ") || "none");
  check("WASM runtime is bundled", wasmFiles.length > 0, wasmFiles.map((file) => path.relative(root, file)).join(", ") || "none");
  check("Ruffle MIT license is bundled", relativeFiles.some((file) => /LICENSE_MIT$/i.test(file)), "Expected LICENSE_MIT");
  check("Ruffle Apache license is bundled", relativeFiles.some((file) => /LICENSE_APACHE$/i.test(file)), "Expected LICENSE_APACHE");
  check("runtime is not loaded from a CDN", !/<script[^>]+src=["']https?:\/\//i.test(html), "Pinned self-hosted runtime expected");
}

if (sourceSwf && !nativeOnly) {
  const source = path.resolve(sourceSwf);
  const sourceHash = sha256(source);
  const matches = swfFiles.filter((file) => sha256(file) === sourceHash);
  check("bundled SWF matches source SHA-256", matches.length > 0, `source=${sourceHash}; matches=${matches.map((file) => path.relative(root, file)).join(", ") || "none"}`);
}

const passed = checks.every((item) => item.passed);
console.log(JSON.stringify({ outputDirectory: root, route: usesRuffle ? "ruffle" : usesCanvas ? "canvas" : "unknown", nativeOnly, passed, checks }, null, 2));
process.exitCode = passed ? 0 : 1;
