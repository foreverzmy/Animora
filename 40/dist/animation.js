import { CanvasTimelinePlayer } from "../../_shared/canvas-timeline/dist/index.js";
const canvas = document.querySelector("#animation");
if (!canvas)
    throw new Error("Missing #animation canvas");
const player = await CanvasTimelinePlayer.create({ canvas, lookaheadFrames: 24 });
globalThis.animation40 = player;
document.addEventListener("pointerdown", () => player.play(), { once: true });
