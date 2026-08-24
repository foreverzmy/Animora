# Conversion routes and commands

Read the section for the selected route. Keep downloads in a temporary directory until the route is confirmed, and use official release sources.

## JPEXS FFDec inspection and Canvas export

FFDec runs from a platform launcher or directly through Java:

```bash
java -jar /path/to/ffdec.jar -cli -dumpSWF input.swf
java -jar /path/to/ffdec.jar -cli -dumpAS2 input.swf
java -jar /path/to/ffdec.jar -cli -dumpAS3 input.swf
java -jar /path/to/ffdec.jar -cli -export script /tmp/swf-scripts input.swf
java -jar /path/to/ffdec.jar -cli -format frame:canvas -export frame /tmp/swf-canvas input.swf
```

Useful formats include `frame:canvas`, `frame:png`, `frame:svg`, `sprite:canvas`, `shape:svg`, and animated WebP/APNG. Prefer a temporary export first so generated files can be inspected before touching the requested output.

FFDec’s Canvas output serializes drawing and timeline data, but it is not a full ActionScript runtime. Inspect exported scripts and compare playback before adopting it. Root-frame scripts such as `prevFrame()` or `stop()` can change how nested timelines advance; `duplicateMovieClip()` and `attachMovie()` can create instances that do not exist in static drawing output.

To turn the export into a reusable vector layer:

```bash
node <skill-dir>/scripts/build-ffdec-canvas-assets.mjs \
  /tmp/swf-canvas/frames.html \
  /tmp/swf-canvas/canvas.js \
  web/dist/vectors.js
```

The helper removes FFDec's demo interval and resize controls, retains the vector functions, and adds a small `window.CanvasVectors` bridge. Its generated `sprite42BaseBelow`/`sprite42BaseTop` variants demonstrate a manual-depth reconstruction for the analyzed movie; adapt the selected symbol IDs for another file.

For MP3 audio stored as nested streaming blocks:

```bash
node <skill-dir>/scripts/extract-stream-audio.mjs movie.swf web/assets/soundtrack.mp3
ffprobe -v error -show_entries stream=codec_name,sample_rate,channels,duration web/assets/soundtrack.mp3
```

Streaming audio may include encoder delay and Flash latency-seek metadata. Align loop boundaries to the master frame clock rather than trusting the decoded file duration alone.

If stream extraction reports no MP3 blocks, inspect `sounds` and `soundStarts` from `inspect-swf.mjs` and export embedded DefineSound assets with FFDec:

```bash
java -jar /path/to/ffdec.jar -cli -export sound /tmp/swf-sounds movie.swf
ffprobe -v error -show_entries stream=codec_name,sample_rate,channels,duration \
  /tmp/swf-sounds/<referenced-audio>
```

Map the StartSound character ID, owner timeline, trigger frame, stop/no-multiple flags, and loop count. The presence of DefineSound does not prove that it is a background track or that it loops.

When Canvas vector masks or alpha do not match, export sprite frames as both PNG and SVG. PNG supplies the renderer-matched pixels; the outer SVG group supplies the symbol origin that the cropped PNG omits:

```bash
java -jar /path/to/ffdec.jar -cli -format sprite:png -export sprite /tmp/sprite-png movie.swf
java -jar /path/to/ffdec.jar -cli -format sprite:svg -export sprite /tmp/sprite-svg movie.swf
node <skill-dir>/scripts/build-png-timeline-assets.mjs \
  /tmp/sprite-png /tmp/sprite-svg /tmp/swf-canvas/frames.html web/assets/timeline
```

The bundled builder contains the symbol inventory for the analyzed `9.swf`; adapt `symbolIds` and `layoutChildren` after inspecting another movie. Do not blindly ship all exported sprites. Retain only timeline owners, dynamic clone sources, and one-frame children needed by the reconstructed display list.

For the generic shared Canvas timeline route, use character selection rather than exporting the entire SWF:

```bash
java -jar /path/to/ffdec.jar -cli -select 0:1-690 \
  -format frame:png -export frame /tmp/root-frames movie.swf
node <skill-dir>/scripts/build-native-frame-manifest.mjs \
  /tmp/root-frames web/movie/assets/timeline/manifest.json \
  550 400 12 '#000000' ../../soundtrack.mp3 once

java -jar /path/to/ffdec.jar -cli -selectid 10,24,119 \
  -format sprite:png -export sprite /tmp/sprite-png movie.swf
java -jar /path/to/ffdec.jar -cli -selectid 10,24,119 \
  -format sprite:svg -export sprite /tmp/sprite-svg movie.swf
node <skill-dir>/scripts/build-native-layer-manifest.mjs \
  /tmp/canvas/frames.html /tmp/sprite-png /tmp/sprite-svg \
  /tmp/shape-png /tmp/shape-svg web/movie/assets/timeline \
  800 500 12 705 119 '#666666' ../../soundtrack.mp3 119 once
```

The frame-manifest builder validates a contiguous sequence and stage-sized PNGs, then copies them beside the manifest. The layer builder rejects unsupported top-level masks, color transforms, and blends instead of silently dropping them. Its optional fields are positional: `clamp-ids`, background, audio path, `sublength-ids`, then `once|loop`.

FFDec `-sublength N` exports descendant animation under `DefineSprite_<id>/1/`. Use it only after mapping frame scripts, and pass the expanded top-level character IDs as `sublength-ids`. Otherwise a stopped controller may accidentally expand an unreachable deep timeline into hundreds of megabytes or more.

For batch layout, selected export, asset budgeting, verification, and delivery records, follow [native-canvas-batch-sop.md](native-canvas-batch-sop.md).

## Self-hosted Ruffle route

Download a pinned stable `web-selfhosted` release from the official Ruffle GitHub releases page. A typical output tree is:

```text
web/
├── index.html
├── assets/
│   └── movie.swf
└── ruffle/
    ├── ruffle.js
    ├── core.ruffle.<hash>.js
    ├── <hash>.wasm
    ├── LICENSE_APACHE
    └── LICENSE_MIT
```

Keep every core/wasm variant referenced by `ruffle.js`; the loader may select a build based on browser WebAssembly capabilities. Source maps are optional for production.

Minimal setup:

```html
<script>
  window.RufflePlayer = window.RufflePlayer || {};
  window.RufflePlayer.config = {
    publicPath: "ruffle/",
    autoplay: "on",
    unmuteOverlay: "hidden",
    contextMenu: "off",
    showSwfDownload: false,
    splashScreen: false,
    letterbox: "off",
    scale: "showAll",
    forceScale: true,
    quality: "best"
  };
</script>
<script src="ruffle/ruffle.js"></script>
```

Create a player with `window.RufflePlayer.newest().createPlayer()`, append it to a stage container, then call `player.ruffle().load({ url: "assets/movie.swf", ... })`. Handle the returned promise and surface a useful load error.

Use CSS such as `width: min(<source-width>px, 100vw)` plus the source aspect ratio. This preserves native 1× dimensions on larger screens and only scales down where required.

## Native PixiJS route

Use this route when the user values editable source and long-term maintenance more than rapid binary compatibility.

1. Export reusable bitmaps, SVG shapes, fonts, audio, and scripts from the SWF/FLA.
2. Inventory the Flash display tree, instance names, frame labels, and scripts.
3. Build a deterministic frame/timeline model before adding visual effects.
4. Implement the simplest representative scene first and compare it to the reference.
5. Add masks, filters, blend modes, dynamic objects, input, and audio incrementally.
6. Keep simulation/update logic separate from rendering so screenshots can be taken at exact frame numbers.

For heavy sprite animation, pack textures into atlases. For complex vectors or expensive filters, benchmark vector rendering against pre-rendered textures. Avoid mixing GSAP and PixiJS tickers without a single clock owner; two independent tickers cause drift.

## Native Canvas + TypeScript route

Prefer Canvas 2D over PixiJS when the source is dominated by exported vector paths, masks, and gradients and has no need for a large interactive scene graph. Use one master frame clock and model each Flash timeline explicitly:

```text
master frame clock
├── stopped root display list
├── independently advancing child timelines
├── depth-ordered static placements
├── depth-keyed ActionScript clones
└── frame-synchronized streamed audio
```

Compose Flash affine matrices in parent-to-child order. Keep child depths scoped to their parent container. A `duplicateMovieClip` depth of 16000 inside a child MovieClip does not render above a sibling of that parent.

For deterministic QA, expose a non-production-affecting seek API or accept `?frame=N`. Compare frames immediately before and after every action frame, at every stop frame, and after at least one full nested-timeline loop.

## Raster playback route

Choose video, animated WebP/APNG, or a frame sequence only when interactivity and selectable text are unnecessary. Preserve exact frame rate and alpha requirements. This route is often smaller and more deterministic than a runtime but cannot reproduce input-driven ActionScript.

## Fidelity triage

Escalate from automatic conversion to manual work when any of these appear:

- ActionScript display-list mutation or runtime symbol creation.
- External resource loading, shared objects, networking, or JavaScript bridge calls.
- Buttons, drag/drop, keyboard input, or input-dependent branching.
- Filters/blend modes whose output differs between Canvas, WebGL, and Flash.
- Embedded fonts or text whose metrics must match exactly.
- Audio synchronization or streaming video.

When the source player is unavailable, use Ruffle playback as the behavioral reference and disclose that limitation.
