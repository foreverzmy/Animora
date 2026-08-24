# Native Canvas batch conversion SOP

Use this SOP when the deliverable must contain no SWF, Ruffle, or WASM and one or more movies should share a Canvas 2D + TypeScript runtime. Read `conversion-routes.md` first for the route boundary and FFDec basics.

## 1. Establish the evidence baseline

For every input, create an audit row before exporting assets:

| Field | Why it matters |
|---|---|
| stage, background, FPS, root frames | Canvas and clock contract |
| nested sprite frame counts | finds animation hidden behind a one-frame root |
| root and nested actions | determines reachable playback and manual behavior work |
| top-level placements, depth, matrices | layer ordering and coordinate reconstruction |
| masks, color transforms, blends, filters | generic manifest compatibility gate |
| DefineSound, StartSound, stream tags | audio extraction and loop policy |
| trusted reference milestones | fidelity evidence independent of the candidate |

Start with:

```bash
node <skill-dir>/scripts/inspect-swf.mjs movie.swf > /tmp/movie-inspection.json
java -jar /path/to/ffdec.jar -cli -dumpSWF movie.swf
java -jar /path/to/ffdec.jar -cli -export script /tmp/movie-scripts movie.swf
```

Read the decompiled scripts. `structuralLongestTimelineFrames` is an inventory signal, not a behavioral duration. A long descendant behind `stop()` or an unvisited `goto*()` branch may never play by default.

## 2. Classify each movie

Choose the smallest faithful native representation:

- **Root raster sequence**: the root really advances through multiple frames and already composites all required masks, color transforms, filters, and blends. This is the safest generic pixel route.
- **Transparent layer composition**: the root has one/few static frames while independently advancing top-level children create the visible motion. Export only unique top-level Shape/Sprite owners as transparent sequences, preserve root placement order, origins, and matrices.
- **Manual display-list rewrite**: ActionScript creates/removes instances, placement state changes over time, or interactions affect output. Implement those semantics explicitly; generic manifests are not an ActionScript runtime.
- **Compatibility route**: only when the user permits an SWF runtime and rapid behavioral fidelity is more important than native output.

Do not use the generic layer builder if top-level masks, non-default color transforms, or blend modes are present. It intentionally fails instead of emitting a misleading approximation. Prefer a root raster sequence or a manual renderer.

## 3. Scaffold the shared runtime once

The skill bundles editable TypeScript plus compiled browser JS in `assets/canvas-timeline`. Scaffold the first movie; later movies reuse the same sibling `_shared/canvas-timeline` directory.

```bash
node <skill-dir>/scripts/scaffold-native-canvas-project.mjs web/10 10
node <skill-dir>/scripts/scaffold-native-canvas-project.mjs web/27 27
```

The default layout is:

```text
web/
├── _shared/canvas-timeline/{src,dist,package.json,tsconfig.json}
├── 10/{index.html,src,dist,assets/timeline}
└── 27/{index.html,src,dist,assets/timeline}
```

Build the shared library before movie entrypoints. Keep one clock owner; never combine an independent ticker with the shared clock.

## 4A. Build a root sequence

Export only the reachable root range, then build the manifest. The builder checks numbering and dimensions and copies frames into the output tree, so the manifest never points into `/tmp`.

```bash
java -jar /path/to/ffdec.jar -cli -select 0:1-690 \
  -format frame:png -export frame /tmp/movie-root movie.swf
node <skill-dir>/scripts/build-native-frame-manifest.mjs \
  /tmp/movie-root web/10/assets/timeline/manifest.json \
  550 400 12 '#000000' ../../soundtrack.mp3 once
```

Use `loop` only when the audio actually loops. The visual root sequence loops by default; change the generated manifest deliberately when the Flash behavior clamps or stops.

## 4B. Build transparent top-level layers

1. Inspect FFDec Canvas `frames.html` to recover top-level placement order and matrices.
2. Collect unique top-level character IDs.
3. Export both PNG and SVG for those IDs. PNG supplies pixels; the SVG outer transform supplies the crop origin.
4. Export Shapes and Sprites separately with `-selectid`.

```bash
java -jar /path/to/ffdec.jar -cli -selectid 10,24,119 \
  -format sprite:png -export sprite /tmp/movie-sprite-png movie.swf
java -jar /path/to/ffdec.jar -cli -selectid 10,24,119 \
  -format sprite:svg -export sprite /tmp/movie-sprite-svg movie.swf
java -jar /path/to/ffdec.jar -cli -selectid 3,7 \
  -format shape:png -export shape /tmp/movie-shape-png movie.swf
java -jar /path/to/ffdec.jar -cli -selectid 3,7 \
  -format shape:svg -export shape /tmp/movie-shape-svg movie.swf
```

If a one-frame top-level Sprite owns descendants that animate, export its evaluated subframes only after script analysis:

```bash
java -jar /path/to/ffdec.jar -cli -selectid 119 -sublength 705 \
  -format sprite:png -export sprite /tmp/movie-sprite-png movie.swf
java -jar /path/to/ffdec.jar -cli -selectid 119 -sublength 705 \
  -format sprite:svg -export sprite /tmp/movie-sprite-svg movie.swf
```

FFDec writes these frames below `DefineSprite_119/1/`; list `119` in `sublength-ids`. The final two builder arguments are `sublength-ids` and audio mode:

```bash
node <skill-dir>/scripts/build-native-layer-manifest.mjs \
  /tmp/movie-canvas/frames.html \
  /tmp/movie-sprite-png /tmp/movie-sprite-svg \
  /tmp/movie-shape-png /tmp/movie-shape-svg \
  web/27/assets/timeline \
  800 500 12 705 119 '#666666' ../../soundtrack.mp3 119 once
```

`clamp-ids` are top-level characters stopped at their last reachable frame. All other sequences loop. Confirm this from actions rather than frame counts.

## 5. Extract and map audio

Try stream extraction first:

```bash
node <skill-dir>/scripts/extract-stream-audio.mjs movie.swf web/10/assets/soundtrack.mp3
```

If no `SoundStreamBlock` MP3 exists, do not conclude that the movie is silent. Inspect `sounds` and `soundStarts` from `inspect-swf.mjs`, then export DefineSound assets:

```bash
java -jar /path/to/ffdec.jar -cli -export sound /tmp/movie-sounds movie.swf
ffprobe -v error -show_entries stream=codec_name,sample_rate,channels,duration \
  /tmp/movie-sounds/<exported-audio>
```

Map the exact `StartSound` location and frame. Respect `syncStop`, `syncNoMultiple`, and `loopCount`; do not treat every DefineSound as one looping soundtrack. Copy only referenced sounds into the output. Browser autoplay may require a first-pointer retry.

## 6. Control asset growth

- Export selected IDs and reachable ranges, never the entire structural descendant tree by default.
- Estimate `frame count × representative PNG size` before a long `-sublength` run. Stop if the estimate violates the delivery budget.
- Keep lossless PNG for a pixel-fidelity claim. Consider WebP/atlas optimization only after same-frame comparison proves it acceptable.
- Tune `lookaheadFrames` to startup/network behavior; it is not a reason to preload the entire movie.
- Deduplicate identical static symbols across layers when provenance and placement remain unambiguous.

## 7. Verify statically and in a browser

Run for every movie:

```bash
node <skill-dir>/scripts/verify-native-manifest.mjs \
  web/10/assets/timeline/manifest.json
node <skill-dir>/scripts/verify-web-output.mjs web/10 movie.swf --native
```

Then serve over HTTP and test:

1. `?frame=N` renders deterministic reference milestones at the source stage size.
2. The default URL advances across at least one meaningful interval.
3. All asset requests succeed and the console remains clean.
4. Audio starts, loops, stops, and seeks according to mapped Flash behavior.
5. Narrow viewport scaling preserves aspect ratio.

A fidelity statement needs a trusted renderer at matching frames. Report either a quantitative pixel diff (with metric and frames) or an explicitly milestone-based visual comparison. A candidate export is not its own reference. Ruffle may be used only as a build-time reference when allowed; a native-only deliverable must contain no SWF, Ruffle, WASM, or external runtime.

## Delivery record

Record the route per movie, reachable duration decision, exported character IDs, clamp/loop decisions, audio trigger mapping, asset size, static-check results, browser frames tested, and fidelity evidence. These facts make the next migration reproducible and prevent accidental re-export of unreachable timelines.
