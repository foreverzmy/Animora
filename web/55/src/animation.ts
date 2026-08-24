import { FFDecStackPlayer } from "../../_shared/ffdec-stack/dist/index.js";

const canvas = document.querySelector<HTMLCanvasElement>("#animation");
if (!canvas) throw new Error("Missing #animation canvas");

const player = await FFDecStackPlayer.create({
  canvas,
  movieNames: ["scg10", "scg9", "scg8", "scg7", "scg6", "scg5", "scg4", "scg3", "scg2", "scg1"],
  width: 1028,
  height: 686,
  fps: 12,
  background: "#000000",
  backgroundFrame: "assets/timeline/root/1.png"
});

(globalThis as unknown as Record<string, unknown>).animation55 = player;
const requestedFrame = Number(new URLSearchParams(location.search).get("frame"));
if (Number.isFinite(requestedFrame) && requestedFrame >= 0 && location.search.includes("frame=")) {
  player.seek(requestedFrame);
} else {
  player.play();
}
document.addEventListener("pointerdown", () => player.play(), { once: true });
