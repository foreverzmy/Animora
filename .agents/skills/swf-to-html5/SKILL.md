---
name: swf-to-html5
description: Convert one or many SWF/Flash animations into browser-deliverable HTML5 with an explicit fidelity strategy. Use this skill whenever a user asks to convert, migrate, preserve, embed, reproduce, batch-process, or pixel-match a .swf/.fla Flash animation, game, banner, courseware, or interactive movie—even when they only say “make it run in modern browsers.” It inspects the SWF first, distinguishes native Canvas/PixiJS rewrites from Ruffle compatibility deployment, can scaffold a shared Canvas 2D + TypeScript timeline, preserves ActionScript-driven behavior when fidelity matters, and verifies the result in a real browser.
compatibility: Requires Node.js for bundled inspection scripts. Native Canvas export benefits from Java and JPEXS FFDec. Pixel-fidelity compatibility output uses a pinned self-hosted Ruffle release. Browser-based visual QA is strongly recommended.
---

# SWF to HTML5

Turn a Flash movie into a browser deliverable without confusing “it renders” with “it behaves like the source.” Inspect the file before selecting a technology because SWF timelines can contain nested sprites, masks, filters, audio, video, and ActionScript-created objects that static exporters do not reproduce.

## Start here

1. Resolve the source `.swf`/`.fla`, requested output directory, deployment constraints, and fidelity requirement from the conversation and workspace.
2. Read repository instructions and inspect existing output before writing. Preserve unrelated or user-authored files.
3. Announce that this skill is being used and state any material route decision.
4. Run the bundled inspector:

   ```bash
   node <skill-dir>/scripts/inspect-swf.mjs path/to/movie.swf
   ```

5. Read [references/conversion-routes.md](references/conversion-routes.md), then select one route using the report and the decision table below. For a native-only batch or shared timeline, also read [references/native-canvas-batch-sop.md](references/native-canvas-batch-sop.md) before exporting.

## Choose the route

| Requirement or source signal | Default route | What to call the result |
|---|---|---|
| Pixel-level fidelity, ActionScript, `duplicateMovieClip`, dynamic timeline control, or unknown behavior; SWF runtime allowed | Self-hosted Ruffle | HTML5 compatibility deployment |
| Pixel-level fidelity plus an explicit ban on SWF/Ruffle/WASM | Canvas 2D + TypeScript + a deterministic display-list/timeline rewrite | Native HTML5 rewrite |
| No ActionScript; shapes, sprites, masks, and fixed timeline only | JPEXS Canvas export, then clean up | Native HTML5 conversion |
| Long-term editable application/game with interaction | PixiJS + TypeScript; use GSAP for authored timelines | Native HTML5 rewrite |
| Real 3D camera, lighting, mesh, or glTF assets | Three.js | Native 3D rewrite |
| Non-interactive playback where raster output is acceptable | Video, animated WebP/APNG, or frame sequence | Raster playback export |

When the user says “pixel-perfect,” prefer Ruffle unless they also require removal of the SWF/runtime. If the user explicitly rejects Ruffle or requires a dependency-free native result, that constraint overrides the compatibility default: preserve FFDec's vector paths, then manually rebuild timeline and ActionScript semantics. A native rewrite can become pixel-matched only after reference-frame comparison; automatic Canvas export alone is not sufficient when ActionScript exists.

## Inspect deeply enough to avoid false confidence

Record at least:

- SWF version, compression, stage dimensions, frame rate, and root frame count.
- Nested `DefineSprite` timelines and their frame counts.
- ActionScript tags at both root and nested levels.
- Bitmap, audio, video, font, morph-shape, filter, mask, and blend-mode usage.
- Decompiled AS1/2 or AS3 behavior when a decompiler is available.

Treat `stop`, `play`, `prevFrame`, `gotoAndPlay`, `duplicateMovieClip`, `attachMovie`, frame scripts, button handlers, timers, and external loads as behavioral requirements. A converter that only emits drawing functions may silently omit them.

## Implement the selected route

### Pixel-fidelity compatibility deployment

Use a pinned stable self-hosted Ruffle release. Keep the runtime, licenses, and SWF inside the output tree so the page does not depend on a CDN.

- Preserve the source stage size at 1× on desktop; scale down proportionally on narrow viewports. Do not enlarge by default when pixel comparison matters.
- Configure autoplay, background, scale mode, letterboxing, menu, and quality to match the source.
- Copy the SWF byte-for-byte and verify its SHA-256 checksum.
- Serve `.wasm` as `application/wasm`; tell the user to use HTTP rather than opening `file://`.
- Disclose that this route executes the SWF through a WebAssembly compatibility runtime. Do not describe it as a source-level native conversion.

### Native Canvas export

Use JPEXS FFDec to dump scripts before exporting frames to Canvas. Clean the generated document into a small `index.html`, a runtime helper, and an animation module. Preserve the source dimensions and frame interval.

If any ActionScript is present, map every action to JavaScript or stop and switch to the compatibility route. In particular, dynamic display-list operations require a runtime object model; copying vector paths does not recreate them.

For a manual native rewrite from FFDec Canvas output:

1. Export frames and ActionScript to temporary directories. Never treat FFDec's generated interval loop as authoritative when frame scripts exist.
2. Keep generated shape/sprite drawing functions as a read-only vector layer. Use `scripts/build-ffdec-canvas-assets.mjs` to remove the demo page/resize UI and expose a small drawing bridge.
   Compare it immediately with a trusted renderer. FFDec Canvas masks, gradients, and premultiplied alpha can differ materially from Flash even when geometry is correct.
3. Give TypeScript a single deterministic frame clock at the SWF frame rate. Root and nested MovieClips need independent playheads; a stopped parent does not automatically stop an already-running child.
4. Split generated sprite renderers at display-list depths when scripts create children. Render dynamic instances inside their owning parent so a large child depth never incorrectly jumps above a parent's siblings.
5. Reimplement `duplicateMovieClip` as depth-keyed instances. Reusing a depth replaces that instance; each clone has its own birth frame and local playhead.
6. Extract nested `SoundStreamBlock` MP3 data with `scripts/extract-stream-audio.mjs`. If it finds no stream, inspect `DefineSound` and `StartSound` from `inspect-swf.mjs`, export only referenced sounds with FFDec, and map frame, loop, stop, and no-multiple semantics. Keep audio on the same master clock and provide a user-gesture fallback for autoplay restrictions.
7. Retain editable `.ts` source and compiled browser JS. Add an exact-frame debug hook or `?frame=N` route so milestone screenshots are deterministic.

If vector Canvas comparison fails, keep the same TypeScript clock and display-list model but replace only the inaccurate drawing layer with FFDec-rendered transparent sprite frames. Use `scripts/build-png-timeline-assets.mjs` to retain per-frame bounds/origins and placement matrices. Draw each PNG at its symbol origin with the composed Flash matrix; because FFDec exports symbol pixels at 1/20 twip scale, multiply the final linear matrix terms by 20 while leaving stage translations unchanged. This hybrid is still native Canvas playback and contains no SWF runtime.

For a batch of movies, use the bundled `assets/canvas-timeline` template and `scripts/scaffold-native-canvas-project.mjs`. Keep the clock, manifest loader, raster cache, Flash matrix handling, audio sync, and debug API shared; keep manifests and assets movie-specific. Follow the complete [native Canvas batch SOP](references/native-canvas-batch-sop.md). It defines the root-sequence versus transparent-layer split, selected `-selectid`/`-sublength` export, SVG-derived crop origins, explicit `clamp`/`loop` behavior, event-audio fallback, asset budgeting, and repeatable acceptance checks.

Never derive behavioral duration from the structurally longest descendant alone. Decompile `stop()` and `goto*()` first and export only reachable/default playback. A deep but unreachable timeline can waste gigabytes without improving fidelity.

### Maintainable PixiJS rewrite

Map Flash concepts deliberately:

- `MovieClip` / nested timeline → `Container` plus an explicit timeline controller.
- Bitmap symbols → textures and spritesheets.
- Vector shapes → `Graphics`, SVG-derived geometry, or pre-rendered textures depending on complexity.
- Masks, color transforms, and blend modes → PixiJS masks, filters, tint/alpha, and blend modes.
- Frame labels and tweens → GSAP timelines or a small deterministic frame clock.
- ActionScript events/state → typed TypeScript modules and pointer events.
- DOM-quality text, forms, and accessibility → an HTML overlay rather than Canvas text.

Use Three.js only when the content truly needs 3D. A rotated or scaled 2D Flash symbol is not a reason to introduce a 3D scene graph.

## Verify in a real browser

1. Run the bundled output checker:

   ```bash
   node <skill-dir>/scripts/verify-native-manifest.mjs path/to/web/movie/assets/timeline/manifest.json
   node <skill-dir>/scripts/verify-web-output.mjs path/to/web path/to/source.swf
   node <skill-dir>/scripts/verify-web-output.mjs path/to/web path/to/source.swf --native
   ```

   Run the manifest checker for native manifest-based output; use the appropriate `verify-web-output` form for the selected route.

2. Start a local HTTP server. Follow the available browser-control skill when browser automation is available.
3. Load the page at the source stage size and confirm:

   - the rendered area exactly matches the SWF width and height;
   - the animation changes across multiple timestamps;
   - the page has no console errors or warnings;
   - all JS, WASM, SWF, image, audio, and font requests succeed;
   - narrow-screen scaling retains the source aspect ratio.

4. For a fidelity claim, compare reference screenshots from a trusted Flash/Ruffle playback against the candidate at the same timestamps. Check geometry, alpha, gradients, masks, blend modes, z-order, text metrics, and ActionScript-created instances. Do not use the candidate export as its own reference.
5. If exact timestamps cannot be controlled, capture the same animation milestones and say that the comparison is milestone-based rather than pixel-diff exact.

## Acceptance checklist

- [ ] The route matches the user’s fidelity and maintainability requirements.
- [ ] Root and nested ActionScript have been inspected, not merely counted at the root.
- [ ] Stage size, frame rate, background, and scaling behavior match the source.
- [ ] Dynamic instances and timeline controls are preserved or explicitly reimplemented.
- [ ] The output is self-contained unless the user approved external dependencies.
- [ ] Runtime licenses are included when shipping Ruffle.
- [ ] A native-only request contains no `.swf`, Ruffle references, or `.wasm` files.
- [ ] Native manifests contain only valid in-tree assets, declared dimensions match PNG files, and asset size is recorded.
- [ ] Browser playback, network loading, and console logs pass.
- [ ] Pixel claims include a trusted-renderer comparison metric or documented milestone comparison, not only visual inspection of the candidate.
- [ ] The handoff accurately labels compatibility deployment versus native conversion.

## Handoff

Lead with the completed output path and selected route. State what was verified, how to serve it locally, and any remaining fidelity limitation. Link the main HTML file and important assets with absolute workspace paths when supported.

Do not promise pixel-perfect fidelity merely because the first frame looks similar. Pixel fidelity is an evidence claim supported by matching dimensions, behavioral coverage, and multi-frame comparison.
