#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const input = process.argv[2];

if (!input) {
  console.error("Usage: node inspect-swf.mjs <movie.swf>");
  process.exit(2);
}

const source = fs.readFileSync(input);
const signature = source.subarray(0, 3).toString("ascii");

if (!new Set(["FWS", "CWS", "ZWS"]).has(signature)) {
  throw new Error(`${input} is not a recognized SWF file`);
}

if (signature === "ZWS") {
  throw new Error("LZMA-compressed ZWS is not supported by this dependency-free inspector; use FFDec -dumpSWF");
}

const swf = signature === "CWS"
  ? Buffer.concat([Buffer.from("FWS"), source.subarray(3, 8), zlib.inflateSync(source.subarray(8))])
  : source;

const tagNames = new Map([
  [0, "End"], [1, "ShowFrame"], [2, "DefineShape"], [6, "DefineBits"],
  [7, "DefineButton"], [9, "SetBackgroundColor"], [10, "DefineFont"],
  [11, "DefineText"], [12, "DoAction"], [14, "DefineSound"], [15, "StartSound"],
  [18, "SoundStreamHead"], [19, "SoundStreamBlock"], [20, "DefineBitsLossless"],
  [21, "DefineBitsJPEG2"], [22, "DefineShape2"], [26, "PlaceObject2"],
  [32, "DefineShape3"], [33, "DefineText2"], [34, "DefineButton2"],
  [35, "DefineBitsJPEG3"], [36, "DefineBitsLossless2"], [37, "DefineEditText"],
  [39, "DefineSprite"], [43, "FrameLabel"], [45, "SoundStreamHead2"],
  [46, "DefineMorphShape"], [56, "ExportAssets"], [59, "DoInitAction"],
  [60, "DefineVideoStream"], [61, "VideoFrame"], [69, "FileAttributes"],
  [70, "PlaceObject3"], [76, "SymbolClass"], [82, "DoABC"],
  [83, "DefineShape4"], [84, "DefineMorphShape2"], [89, "StartSound2"], [90, "DefineBitsJPEG4"]
]);

const actionNames = new Map([
  [0x04, "NextFrame"], [0x05, "PreviousFrame"], [0x06, "Play"],
  [0x07, "Stop"], [0x24, "CloneSprite"], [0x25, "RemoveSprite"],
  [0x81, "GotoFrame"], [0x8c, "GotoLabel"], [0x99, "Jump"],
  [0x9f, "GotoFrame2"]
]);

let cursor = 8;
let bitOffset = 0;

function readBits(count) {
  let value = 0n;
  for (let i = 0; i < count; i += 1) {
    const byte = swf[cursor + Math.floor(bitOffset / 8)];
    const bit = (byte >> (7 - (bitOffset % 8))) & 1;
    value = (value << 1n) | BigInt(bit);
    bitOffset += 1;
  }
  return value;
}

function readSignedBits(count) {
  const value = readBits(count);
  const sign = 1n << BigInt(count - 1);
  return Number((value & sign) ? value - (1n << BigInt(count)) : value);
}

const rectBits = Number(readBits(5));
const rectTwips = {
  xMin: readSignedBits(rectBits),
  xMax: readSignedBits(rectBits),
  yMin: readSignedBits(rectBits),
  yMax: readSignedBits(rectBits)
};
cursor += Math.ceil(bitOffset / 8);

const frameRate = swf[cursor + 1] + swf[cursor] / 256;
const frameCount = swf.readUInt16LE(cursor + 2);
cursor += 4;

const recursiveCounts = new Map();
const topLevelCounts = new Map();
const sprites = [];
const actions = [];
const sounds = [];
const soundStarts = [];
let backgroundColor = "#000000";

function increment(map, code) {
  map.set(code, (map.get(code) || 0) + 1);
}

function decodeActionOpcodes(payload) {
  const opcodes = [];
  let offset = 0;
  while (offset < payload.length) {
    const opcode = payload[offset];
    offset += 1;
    if (opcode === 0) break;
    opcodes.push(actionNames.get(opcode) || `0x${opcode.toString(16).padStart(2, "0")}`);
    if (opcode >= 0x80) {
      if (offset + 2 > payload.length) break;
      const length = payload.readUInt16LE(offset);
      offset += 2 + length;
    }
  }
  return opcodes;
}

function decodeSoundInfo(payloadStart, payloadEnd) {
  if (payloadStart >= payloadEnd) return {};
  const flags = swf[payloadStart];
  const info = {
    syncStop: Boolean(flags & 0x20),
    syncNoMultiple: Boolean(flags & 0x10),
    hasEnvelope: Boolean(flags & 0x08),
    hasLoops: Boolean(flags & 0x04),
    hasOutPoint: Boolean(flags & 0x02),
    hasInPoint: Boolean(flags & 0x01),
    loopCount: null
  };
  let offset = payloadStart + 1;
  if (info.hasInPoint) offset += 4;
  if (info.hasOutPoint) offset += 4;
  if (info.hasLoops && offset + 2 <= payloadEnd) info.loopCount = swf.readUInt16LE(offset);
  return info;
}

function parseTags(start, end, location, topLevel = false) {
  let offset = start;
  let frame = 1;

  while (offset + 2 <= end) {
    const header = swf.readUInt16LE(offset);
    offset += 2;
    const code = header >> 6;
    let length = header & 0x3f;

    if (length === 0x3f) {
      if (offset + 4 > end) break;
      length = swf.readUInt32LE(offset);
      offset += 4;
    }

    const payloadStart = offset;
    const payloadEnd = Math.min(offset + length, end);
    increment(recursiveCounts, code);
    if (topLevel) increment(topLevelCounts, code);

    if ([12, 59, 82].includes(code)) {
      const payload = swf.subarray(payloadStart, payloadEnd);
      actions.push({
        location,
        frame,
        tag: tagNames.get(code) || `Tag${code}`,
        length,
        opcodes: code === 12 ? decodeActionOpcodes(payload) : []
      });
    }

    if (code === 9 && topLevel && payloadEnd - payloadStart >= 3) {
      backgroundColor = `#${[swf[payloadStart], swf[payloadStart + 1], swf[payloadStart + 2]]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")}`;
    }

    if (code === 14 && payloadEnd - payloadStart >= 7) {
      const packed = swf[payloadStart + 2];
      sounds.push({
        soundId: swf.readUInt16LE(payloadStart),
        format: packed >> 4,
        rateCode: (packed >> 2) & 3,
        sampleSize16: Boolean(packed & 2),
        stereo: Boolean(packed & 1),
        sampleCount: swf.readUInt32LE(payloadStart + 3)
      });
    }

    if (code === 15 && payloadEnd - payloadStart >= 3) {
      soundStarts.push({
        location,
        frame,
        soundId: swf.readUInt16LE(payloadStart),
        ...decodeSoundInfo(payloadStart + 2, payloadEnd)
      });
    }

    if (code === 39 && payloadEnd - payloadStart >= 4) {
      const characterId = swf.readUInt16LE(payloadStart);
      const spriteFrames = swf.readUInt16LE(payloadStart + 2);
      const spriteLocation = `${location}/sprite:${characterId}`;
      sprites.push({ characterId, frameCount: spriteFrames, location: spriteLocation });
      parseTags(payloadStart + 4, payloadEnd, spriteLocation, false);
    }

    if (code === 1) frame += 1;
    offset = payloadEnd;
    if (code === 0) break;
  }
}

parseTags(cursor, swf.length, "root", true);

function countsToObject(counts) {
  return Object.fromEntries(
    [...counts.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([code, count]) => [tagNames.get(code) || `Tag${code}`, count])
  );
}

function countCodes(codes) {
  return codes.reduce((total, code) => total + (recursiveCounts.get(code) || 0), 0);
}

const signals = {
  hasActionScript: actions.length > 0,
  actionTagCount: actions.length,
  nestedSpriteCount: sprites.length,
  shapeCount: countCodes([2, 22, 32, 83]),
  morphShapeCount: countCodes([46, 84]),
  bitmapCount: countCodes([6, 20, 21, 35, 36, 90]),
  audioTagCount: countCodes([14, 15, 18, 19, 45, 89]),
  defineSoundCount: sounds.length,
  startSoundCount: soundStarts.length,
  hasEventSounds: soundStarts.length > 0,
  videoTagCount: countCodes([60, 61]),
  textTagCount: countCodes([11, 33, 37])
};

const longestTimelineFrames = Math.max(frameCount, ...sprites.map((sprite) => sprite.frameCount));

const report = {
  source: path.resolve(input),
  signature,
  compressed: signature !== "FWS",
  version: swf[3],
  declaredLength: swf.readUInt32LE(4),
  decodedLength: swf.length,
  stage: {
    width: (rectTwips.xMax - rectTwips.xMin) / 20,
    height: (rectTwips.yMax - rectTwips.yMin) / 20,
    background: backgroundColor,
    rectTwips
  },
  frameRate,
  frameCount,
  rootDurationSeconds: frameRate ? frameCount / frameRate : null,
  longestTimelineFrames,
  longestTimelineSeconds: frameRate ? longestTimelineFrames / frameRate : null,
  structuralLongestTimelineFrames: longestTimelineFrames,
  structuralLongestTimelineSeconds: frameRate ? longestTimelineFrames / frameRate : null,
  signals,
  topLevelTags: countsToObject(topLevelCounts),
  recursiveTags: countsToObject(recursiveCounts),
  sprites,
  actions,
  sounds,
  soundStarts,
  recommendedRoute: signals.hasActionScript
    ? "Use self-hosted Ruffle for rapid high-fidelity delivery, or manually rewrite every ActionScript behavior for a native conversion."
    : "A native Canvas/PixiJS export is a reasonable first route; still verify masks, filters, text, and nested timelines."
};

console.log(JSON.stringify(report, null, 2));
