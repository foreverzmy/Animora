export type Matrix = readonly [number, number, number, number, number, number];

interface FrameAsset { src: string; size: [number, number]; origin: [number, number]; }
interface Placement { id: number; matrix: Matrix; }
interface TimelineManifest { version: number; symbols: Record<string, FrameAsset[]>; layout42: Placement[][]; }

export function multiply(a: Matrix, b: Matrix): Matrix {
  return [
    a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]
  ];
}

export class RasterTimelineRenderer {
  readonly manifest: TimelineManifest;
  private readonly context: CanvasRenderingContext2D;
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly pending = new Map<string, Promise<void>>();

  private constructor(canvas: HTMLCanvasElement, manifest: TimelineManifest) {
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas 2D is unavailable");
    this.context = context;
    this.manifest = manifest;
  }

  static async create(canvas: HTMLCanvasElement): Promise<RasterTimelineRenderer> {
    const response = await fetch("assets/timeline/manifest.json");
    if (!response.ok) throw new Error(`Timeline manifest failed: ${response.status}`);
    return new RasterTimelineRenderer(canvas, await response.json() as TimelineManifest);
  }

  begin(): void {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  draw(id: number, matrix: Matrix, frame: number): void {
    const asset = this.asset(id, frame);
    const image = this.images.get(asset.src);
    if (!image) return;
    const [a, b, c, d, e, f] = matrix;
    this.context.setTransform(a * 20, b * 20, c * 20, d * 20, e, f);
    this.context.drawImage(image, -asset.origin[0], -asset.origin[1]);
  }

  layout(frame: number): readonly Placement[] {
    const normalized = ((Math.floor(frame) % this.manifest.layout42.length) + this.manifest.layout42.length) % this.manifest.layout42.length;
    return this.manifest.layout42[normalized] ?? [];
  }

  async ensure(requests: Iterable<readonly [number, number]>): Promise<void> {
    await Promise.all([...requests].map(([id, frame]) => this.load(id, frame)));
  }

  async preloadAll(): Promise<void> {
    for (const [id, frames] of Object.entries(this.manifest.symbols)) {
      await Promise.all(frames.map((_, frame) => this.load(Number(id), frame)));
    }
  }

  private asset(id: number, frame: number): FrameAsset {
    const frames = this.manifest.symbols[String(id)];
    if (!frames?.length) throw new Error(`Missing symbol ${id}`);
    return frames[((frame % frames.length) + frames.length) % frames.length];
  }

  private load(id: number, frame: number): Promise<void> {
    const asset = this.asset(id, frame);
    if (this.images.has(asset.src)) return Promise.resolve();
    const existing = this.pending.get(asset.src);
    if (existing) return existing;
    const promise = new Promise<void>((resolve, reject) => {
      const image = new Image(asset.size[0], asset.size[1]);
      image.decoding = "async";
      image.onload = () => { this.images.set(asset.src, image); resolve(); };
      image.onerror = () => reject(new Error(`Frame failed: ${asset.src}`));
      image.src = `assets/timeline/${asset.src}`;
    }).finally(() => this.pending.delete(asset.src));
    this.pending.set(asset.src, promise);
    return promise;
  }
}
