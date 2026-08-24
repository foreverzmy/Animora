export type Matrix = readonly [number, number, number, number, number, number];
export type FrameMode = "loop" | "clamp";

export interface FrameAsset { src: string; size: readonly [number, number]; origin?: readonly [number, number]; }
export interface Sequence { frames: readonly FrameAsset[]; space: "pixels" | "flash"; }
export interface Layer { sequence: string; matrix?: Matrix; offset?: number; mode?: FrameMode; }
export interface TimelineManifest {
  version: 1;
  stage: { width: number; height: number; background: string };
  fps: number;
  durationFrames: number;
  sequences: Record<string, Sequence>;
  layers: readonly Layer[];
  audio?: { src: string; loop?: boolean };
}
export interface PlayerOptions { canvas: HTMLCanvasElement; manifestUrl?: string; autoplay?: boolean; lookaheadFrames?: number; }
export interface TimelineDebugApi { readonly currentFrame: number; pause(): void; play(): void; seek(frame: number): Promise<void>; }

function normalizedFrame(frame: number, length: number, mode: FrameMode): number {
  if (length < 1) throw new Error("A sequence must contain at least one frame");
  const whole = Math.max(0, Math.floor(frame));
  return mode === "clamp" ? Math.min(whole, length - 1) : whole % length;
}

export class FrameClock {
  readonly fps: number;
  private readonly onFrame: (frame: number) => void;
  private anchorFrame = 0;
  private anchorTime = 0;
  private shownFrame = -1;
  private requestId = 0;
  private running = false;

  constructor(fps: number, onFrame: (frame: number) => void) { this.fps = fps; this.onFrame = onFrame; }
  get currentFrame(): number { return Math.max(0, this.shownFrame); }
  start(): void { this.play(); }
  play(): void {
    if (this.running) return;
    this.running = true;
    this.anchorFrame = this.currentFrame;
    this.anchorTime = performance.now();
    this.tick(this.anchorTime);
  }
  pause(): void { this.running = false; cancelAnimationFrame(this.requestId); }
  seek(frame: number): void {
    const target = Math.max(0, Math.floor(frame));
    this.anchorFrame = target;
    this.anchorTime = performance.now();
    this.show(target, true);
  }
  private readonly tick = (now: number): void => {
    if (!this.running) return;
    this.show(this.anchorFrame + Math.floor((now - this.anchorTime) * this.fps / 1000));
    this.requestId = requestAnimationFrame(this.tick);
  };
  private show(frame: number, force = false): void {
    if (!force && frame === this.shownFrame) return;
    this.shownFrame = frame;
    this.onFrame(frame);
  }
}

export class CanvasTimelinePlayer implements TimelineDebugApi {
  readonly manifest: TimelineManifest;
  private readonly context: CanvasRenderingContext2D;
  private readonly assetBase: URL;
  private readonly clock: FrameClock;
  private readonly lookaheadFrames: number;
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly pending = new Map<string, Promise<void>>();
  private readonly audio?: HTMLAudioElement;
  private wantedFrame = 0;

  private constructor(options: PlayerOptions, manifest: TimelineManifest, assetBase: URL) {
    const context = options.canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas 2D is unavailable");
    this.context = context;
    this.manifest = manifest;
    this.assetBase = assetBase;
    this.lookaheadFrames = options.lookaheadFrames ?? 24;
    options.canvas.width = manifest.stage.width;
    options.canvas.height = manifest.stage.height;
    this.clock = new FrameClock(manifest.fps, (frame) => { void this.request(frame); });
    if (manifest.audio) {
      this.audio = new Audio(new URL(manifest.audio.src, assetBase).href);
      this.audio.preload = "auto";
      this.audio.loop = manifest.audio.loop ?? false;
    }
  }

  static async create(options: PlayerOptions): Promise<CanvasTimelinePlayer> {
    const response = await fetch(options.manifestUrl ?? "assets/timeline/manifest.json");
    if (!response.ok) throw new Error(`Timeline manifest failed: ${response.status}`);
    const player = new CanvasTimelinePlayer(options, await response.json() as TimelineManifest, new URL(".", response.url));
    const query = new URLSearchParams(location.search).get("frame");
    const initial = query !== null && Number.isFinite(Number(query)) ? Math.max(0, Math.floor(Number(query))) : 0;
    await player.seek(initial);
    if (query === null && options.autoplay !== false) player.play();
    return player;
  }

  get currentFrame(): number { return this.clock.currentFrame; }
  pause(): void { this.clock.pause(); this.audio?.pause(); }
  play(): void { this.clock.play(); void this.startAudio(); }
  async seek(frame: number): Promise<void> {
    const target = Math.max(0, Math.floor(frame));
    this.clock.pause();
    await this.request(target);
    this.clock.seek(target);
    if (this.audio && Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
      const seconds = target / this.manifest.fps;
      this.audio.currentTime = this.audio.loop ? seconds % this.audio.duration : Math.min(seconds, this.audio.duration);
    }
  }

  private async request(frame: number): Promise<void> {
    this.wantedFrame = frame;
    await this.ensureFrame(frame);
    if (frame !== this.wantedFrame) return;
    this.draw(frame);
    for (let offset = 1; offset <= this.lookaheadFrames; offset += 1) void this.ensureFrame(frame + offset);
  }
  private draw(frame: number): void {
    const ctx = this.context;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = this.manifest.stage.background;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const layer of this.manifest.layers) {
      const sequence = this.sequence(layer.sequence);
      const asset = sequence.frames[normalizedFrame(frame + (layer.offset ?? 0), sequence.frames.length, layer.mode ?? "loop")];
      const image = this.images.get(asset.src);
      if (!image) continue;
      const matrix = layer.matrix ?? [1, 0, 0, 1, 0, 0];
      const scale = sequence.space === "flash" ? 20 : 1;
      ctx.setTransform(matrix[0] * scale, matrix[1] * scale, matrix[2] * scale, matrix[3] * scale, matrix[4], matrix[5]);
      const origin = asset.origin ?? [0, 0];
      ctx.drawImage(image, -origin[0], -origin[1]);
    }
  }
  private async ensureFrame(frame: number): Promise<void> {
    await Promise.all(this.manifest.layers.map((layer) => {
      const sequence = this.sequence(layer.sequence);
      return this.load(sequence.frames[normalizedFrame(frame + (layer.offset ?? 0), sequence.frames.length, layer.mode ?? "loop")]);
    }));
  }
  private sequence(name: string): Sequence {
    const sequence = this.manifest.sequences[name];
    if (!sequence) throw new Error(`Missing timeline sequence: ${name}`);
    return sequence;
  }
  private load(asset: FrameAsset): Promise<void> {
    if (this.images.has(asset.src)) return Promise.resolve();
    const existing = this.pending.get(asset.src);
    if (existing) return existing;
    const promise = new Promise<void>((resolve, reject) => {
      const image = new Image(asset.size[0], asset.size[1]);
      image.decoding = "async";
      image.onload = () => { this.images.set(asset.src, image); resolve(); };
      image.onerror = () => reject(new Error(`Timeline frame failed: ${asset.src}`));
      image.src = new URL(asset.src, this.assetBase).href;
    }).finally(() => this.pending.delete(asset.src));
    this.pending.set(asset.src, promise);
    return promise;
  }
  private async startAudio(): Promise<void> {
    if (!this.audio) return;
    try { await this.audio.play(); } catch { /* Browsers retry on the first user gesture. */ }
  }
}
