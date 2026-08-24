# Canvas Timeline

Shared native HTML5 playback for the converted Flash movies in `web/`.

- Canvas 2D renderer with Flash affine-matrix support (`flash` sequences use twip-space matrices).
- Deterministic `FrameClock` at the manifest FPS (12 FPS for the current movies).
- Looping and clamped child playheads, async image loading, short look-ahead cache, audio sync, and `?frame=N` QA.
- `CanvasTimelinePlayer.create(...)` exposes `play()`, `pause()`, `seek()`, and `currentFrame`.

Build the library first, then build each animation project:

```bash
tsc -p web/_shared/canvas-timeline/tsconfig.json
tsc -p web/10/tsconfig.json
```

Each animation keeps its own `assets/timeline/manifest.json`; the runtime contains no SWF parser or Flash compatibility layer.
