#!/usr/bin/env node

import { availableParallelism } from "node:os";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { mkdir, readdir, readFile, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = join(projectRoot, "web");
const outputRoot = resolve(process.argv[2] ?? join(projectRoot, ".pages-dist"));
const maxPublishedBytes = 950 * 1024 * 1024;
const concurrency = Math.max(2, Math.min(12, availableParallelism()));

const excludedNames = new Set([
  ".DS_Store",
  "conversion.json",
  "package.json",
  "tsconfig.json"
]);

const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".svg"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name === "src") continue;
    if (excludedNames.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let errorOutput = "";
    child.stderr.on("data", (chunk) => { errorOutput += chunk; });
    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${command} exited with ${code}: ${errorOutput.trim()}`));
    });
  });
}

async function copyDeployFile(source) {
  const relativePath = relative(sourceRoot, source);
  const extension = extname(source).toLowerCase();
  const target = join(outputRoot, relativePath);
  await mkdir(dirname(target), { recursive: true });

  if (textExtensions.has(extension)) {
    const content = await readFile(source, "utf8");
    await writeFile(target, content.replaceAll(".png", ".webp"));
  } else {
    await copyFile(source, target);
  }
}

async function convertPng(source) {
  const relativePath = relative(sourceRoot, source).replace(/\.png$/i, ".webp");
  const target = join(outputRoot, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await run("cwebp", ["-quiet", "-q", "90", "-alpha_q", "100", "-m", "4", "-sharp_yuv", source, "-o", target]);
}

async function runPool(items, worker) {
  let cursor = 0;
  let complete = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      await worker(item);
      complete += 1;
      if (complete % 500 === 0 || complete === items.length) {
        process.stdout.write(`\rConverted ${complete}/${items.length} PNG files`);
      }
    }
  });
  await Promise.all(workers);
  process.stdout.write("\n");
}

async function directorySize(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    total += entry.isDirectory() ? await directorySize(absolute) : (await stat(absolute)).size;
  }
  return total;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const files = await walk(sourceRoot);
const pngFiles = files.filter((file) => extname(file).toLowerCase() === ".png");
const regularFiles = files.filter((file) => extname(file).toLowerCase() !== ".png");

console.log(`Building Animora Pages from ${basename(sourceRoot)}`);
console.log(`Copying ${regularFiles.length} files; converting ${pngFiles.length} PNG files with ${concurrency} workers`);

await Promise.all(regularFiles.map(copyDeployFile));
await runPool(pngFiles, convertPng);
await writeFile(join(outputRoot, ".nojekyll"), "");

const bytes = await directorySize(outputRoot);
console.log(`Pages output: ${(bytes / 1024 / 1024).toFixed(1)} MiB at ${outputRoot}`);
if (bytes > maxPublishedBytes) {
  throw new Error(`Pages output exceeds the 950 MiB safety limit: ${(bytes / 1024 / 1024).toFixed(1)} MiB`);
}
