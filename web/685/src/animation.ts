import { CanvasTimelinePlayer } from "../../_shared/canvas-timeline/dist/index.js";

const canvas = document.querySelector<HTMLCanvasElement>("#animation");
if (!canvas) throw new Error("Missing #animation canvas");
const player = await CanvasTimelinePlayer.create({ canvas, lookaheadFrames: 24 });
(globalThis as unknown as Record<string, unknown>).animation685 = player;
document.addEventListener("pointerdown", () => player.play(), { once: true });
