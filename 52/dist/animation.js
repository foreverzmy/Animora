import { FFDecStackPlayer } from "../../_shared/ffdec-stack/dist/index.js";
const canvas = document.querySelector("#animation");
if (!canvas)
    throw new Error("Missing #animation canvas");
const player = await FFDecStackPlayer.create({
    canvas,
    movieNames: ["yu3", "yu2", "yu1"],
    width: 1028,
    height: 686,
    fps: 12,
    background: "#000000",
    backgroundFrame: "assets/timeline/root/1.webp"
});
globalThis.animation52 = player;
const eventAudio = new Audio("assets/sound-51.mp3");
eventAudio.preload = "auto";
let audioStarted = false;
async function startAudio() {
    if (audioStarted)
        return;
    try {
        await eventAudio.play();
        audioStarted = true;
    }
    catch {
        // Autoplay can be retried from the first pointer gesture below.
    }
}
const requestedFrame = Number(new URLSearchParams(location.search).get("frame"));
if (Number.isFinite(requestedFrame) && requestedFrame >= 0 && location.search.includes("frame=")) {
    player.seek(requestedFrame);
}
else {
    player.play();
    void startAudio();
}
document.addEventListener("pointerdown", () => {
    player.play();
    void startAudio();
}, { once: true });
