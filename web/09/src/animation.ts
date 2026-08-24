import { RasterTimelineRenderer, multiply, type Matrix } from "./renderer.js";
import { FrameClock } from "../../_shared/canvas-timeline/dist/index.js";

interface ParticleFamily {
  symbol: 34 | 36 | 38 | 40;
  parentFrames: number;
  symbolFrames: number;
  parentMatrix: Matrix;
  childMatrix: Matrix;
  emissions: readonly number[];
}

const FPS = 12;
const ROOT_ORNAMENT: Matrix = [0.06324310302734375, 0, 0, 0.03221969604492188, 328.75, 403.5];
const ROOT_BANNER: Matrix = [0.05, 0, 0, 0.05, 339.85, 278];
const ROOT_FLOWER: Matrix = [0.055523681640625, 0, 0, 0.052379608154296875, 453.1, 224.05];

const PARTICLES: readonly ParticleFamily[] = [
  { symbol: 34, parentFrames: 160, symbolFrames: 160, parentMatrix: [1, 0, 0, 1, -743, -545], childMatrix: [1, 0, 0, 1, -424, -717], emissions: [39, 69, 119] },
  { symbol: 36, parentFrames: 134, symbolFrames: 130, parentMatrix: [1, 0, 0, 1, -922, -370], childMatrix: [0.96490478515625, 0.259429931640625, -0.259429931640625, 0.96490478515625, -833, -452], emissions: [38, 78, 113] },
  { symbol: 38, parentFrames: 160, symbolFrames: 150, parentMatrix: [1, 0, 0, 1, -980, 47], childMatrix: [0.928497314453125, 0.368011474609375, -0.368011474609375, 0.928497314453125, -189, -1028], emissions: [54, 94, 129] },
  { symbol: 40, parentFrames: 165, symbolFrames: 165, parentMatrix: [1, 0, 0, 1, -1040, -383], childMatrix: [0.956298828125, 0.2892303466796875, -0.2892303466796875, 0.956298828125, -153, -1172], emissions: [44, 84, 129] }
] as const;

function latestEmission(frame: number, firstEmission: number, period: number): number | null {
  if (frame < firstEmission) return null;
  return firstEmission + Math.floor((frame - firstEmission) / period) * period;
}

function requiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
}

const canvas = requiredElement<HTMLCanvasElement>("#animation");
const audio = requiredElement<HTMLAudioElement>("#soundtrack");
const renderer = await RasterTimelineRenderer.create(canvas);

function requestsFor(frame: number): Array<readonly [number, number]> {
  const requests: Array<readonly [number, number]> = [[4, frame % 200], [13, Math.min(frame, 179)]];
  for (const placement of renderer.layout(frame)) requests.push([placement.id, 0]);
  for (const family of PARTICLES) {
    requests.push([family.symbol, (frame % family.parentFrames) % family.symbolFrames]);
    for (const emission of family.emissions) {
      const bornAt = latestEmission(frame, emission, family.parentFrames);
      if (bornAt !== null) requests.push([family.symbol, (frame - bornAt) % family.symbolFrames]);
    }
  }
  return requests;
}

function render(frame: number): void {
  renderer.begin();
  renderer.draw(4, ROOT_ORNAMENT, frame % 200);
  renderer.draw(13, ROOT_BANNER, Math.min(frame, 179));

  const layout = renderer.layout(frame);
  for (const placement of layout) {
    if (placement.id !== 30) renderer.draw(placement.id, multiply(ROOT_FLOWER, placement.matrix), 0);
  }

  for (const family of PARTICLES) {
    const matrix = multiply(multiply(ROOT_FLOWER, family.parentMatrix), family.childMatrix);
    renderer.draw(family.symbol, matrix, (frame % family.parentFrames) % family.symbolFrames);
    for (const emission of family.emissions) {
      const bornAt = latestEmission(frame, emission, family.parentFrames);
      if (bornAt !== null) renderer.draw(family.symbol, matrix, (frame - bornAt) % family.symbolFrames);
    }
  }

  const top = layout.find((placement) => placement.id === 30);
  if (top) renderer.draw(top.id, multiply(ROOT_FLOWER, top.matrix), 0);
  if (!audio.paused && frame % 40 === 0 && frame > 0) audio.currentTime = 0;
}

async function show(frame: number): Promise<void> {
  await renderer.ensure(requestsFor(frame));
  render(frame);
}

const clock = new FrameClock(FPS, (frame) => {
  void renderer.ensure(requestsFor(frame)).then(() => render(frame));
});

window.animation09 = Object.freeze({
  pause: () => clock.pause(),
  play: () => clock.start(),
  seek: (frame: number) => { clock.pause(); void show(frame).then(() => clock.seek(frame)); },
  get currentFrame() { return clock.currentFrame; }
});

async function enableAudio(): Promise<void> {
  try { await audio.play(); } catch { /* A user gesture retries without altering the artwork. */ }
}
document.addEventListener("pointerdown", () => void enableAudio(), { once: true });

const requestedFrame = new URLSearchParams(location.search).get("frame");
const initialFrame = requestedFrame !== null && Number.isFinite(Number(requestedFrame)) ? Math.max(0, Math.floor(Number(requestedFrame))) : 0;
await show(initialFrame);

if (requestedFrame === null) {
  for (let offset = 1; offset <= 48; offset += 1) void renderer.ensure(requestsFor(offset));
  clock.seek(0);
  clock.start();
  void enableAudio();
  void renderer.preloadAll();
} else {
  clock.seek(initialFrame);
}
