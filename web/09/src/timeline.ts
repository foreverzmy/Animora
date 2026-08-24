export type FrameListener = (frame: number) => void;

export class FrameClock {
  readonly fps: number;
  private readonly render: FrameListener;
  private anchorFrame = 0;
  private anchorTime = 0;
  private shownFrame = -1;
  private requestId = 0;
  private running = false;

  constructor(fps: number, render: FrameListener) {
    this.fps = fps;
    this.render = render;
  }

  get currentFrame(): number {
    return Math.max(0, this.shownFrame);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.anchorTime = performance.now();
    this.anchorFrame = Math.max(0, this.shownFrame);
    this.tick(this.anchorTime);
  }

  pause(): void {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.requestId);
  }

  seek(frame: number): void {
    const target = Math.max(0, Math.floor(frame));
    this.anchorFrame = target;
    this.anchorTime = performance.now();
    this.show(target, true);
  }

  private readonly tick = (now: number): void => {
    if (!this.running) return;
    const elapsedFrames = Math.floor((now - this.anchorTime) * this.fps / 1000);
    this.show(this.anchorFrame + elapsedFrames);
    this.requestId = requestAnimationFrame(this.tick);
  };

  private show(frame: number, force = false): void {
    if (!force && frame === this.shownFrame) return;
    this.shownFrame = frame;
    this.render(frame);
  }
}
