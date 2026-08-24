#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: node extract-stream-audio.mjs <movie.swf> <output.mp3>");
  process.exit(2);
}

const source = fs.readFileSync(inputPath);
const signature = source.subarray(0, 3).toString("ascii");
if (!new Set(["FWS", "CWS"]).has(signature)) {
  throw new Error("Only uncompressed FWS and zlib-compressed CWS files are supported");
}

const swf = signature === "CWS"
  ? Buffer.concat([Buffer.from("FWS"), source.subarray(3, 8), zlib.inflateSync(source.subarray(8))])
  : source;

function movieTagsOffset() {
  const nbits = swf[8] >> 3;
  const rectBytes = Math.ceil((5 + nbits * 4) / 8);
  return 8 + rectBytes + 4;
}

const streams = [];

function parseTagStream(start, end, location) {
  let offset = start;
  let current = null;
  let frame = 0;

  while (offset + 2 <= end) {
    const header = swf.readUInt16LE(offset);
    offset += 2;
    const code = header >> 6;
    let length = header & 0x3f;
    if (length === 0x3f) {
      length = swf.readUInt32LE(offset);
      offset += 4;
    }
    const payloadStart = offset;
    const payloadEnd = Math.min(offset + length, end);

    if ((code === 18 || code === 45) && length >= 4) {
      const streamByte = swf[payloadStart + 1];
      current = {
        location,
        compression: streamByte >> 4,
        rateCode: (streamByte >> 2) & 3,
        sampleSize16: Boolean(streamByte & 2),
        stereo: Boolean(streamByte & 1),
        samplesPerFrame: swf.readUInt16LE(payloadStart + 2),
        latencySeek: length >= 6 ? swf.readInt16LE(payloadStart + 4) : 0,
        blocks: []
      };
      streams.push(current);
    } else if (code === 19 && current) {
      const payload = swf.subarray(payloadStart, payloadEnd);
      current.blocks.push({ frame, payload });
    } else if (code === 39 && length >= 4) {
      const characterId = swf.readUInt16LE(payloadStart);
      parseTagStream(payloadStart + 4, payloadEnd, `${location}/sprite:${characterId}`);
    }

    if (code === 1) frame += 1;
    offset = payloadEnd;
    if (code === 0) break;
  }
}

parseTagStream(movieTagsOffset(), swf.length, "root");
const candidates = streams.filter((stream) => stream.compression === 2 && stream.blocks.length);
if (!candidates.length) throw new Error("No MP3 SoundStream was found");

const selected = candidates.sort((a, b) => b.blocks.length - a.blocks.length)[0];
const mp3 = Buffer.concat(selected.blocks.map(({ payload }) => {
  if (payload.length < 4) throw new Error("Malformed MP3 SoundStreamBlock");
  return payload.subarray(4);
}));

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(outputPath, mp3);
console.log(JSON.stringify({
  output: path.resolve(outputPath),
  bytes: mp3.length,
  location: selected.location,
  blocks: selected.blocks.length,
  samplesPerFrame: selected.samplesPerFrame,
  latencySeek: selected.latencySeek,
  rateCode: selected.rateCode,
  stereo: selected.stereo
}, null, 2));
