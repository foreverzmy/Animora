export class FrameClock {
    fps;
    render;
    anchorFrame = 0;
    anchorTime = 0;
    shownFrame = -1;
    requestId = 0;
    running = false;
    constructor(fps, render) {
        this.fps = fps;
        this.render = render;
    }
    get currentFrame() {
        return Math.max(0, this.shownFrame);
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.anchorTime = performance.now();
        this.anchorFrame = Math.max(0, this.shownFrame);
        this.tick(this.anchorTime);
    }
    pause() {
        if (!this.running)
            return;
        this.running = false;
        cancelAnimationFrame(this.requestId);
    }
    seek(frame) {
        const target = Math.max(0, Math.floor(frame));
        this.anchorFrame = target;
        this.anchorTime = performance.now();
        this.show(target, true);
    }
    tick = (now) => {
        if (!this.running)
            return;
        const elapsedFrames = Math.floor((now - this.anchorTime) * this.fps / 1000);
        this.show(this.anchorFrame + elapsedFrames);
        this.requestId = requestAnimationFrame(this.tick);
    };
    show(frame, force = false) {
        if (!force && frame === this.shownFrame)
            return;
        this.shownFrame = frame;
        this.render(frame);
    }
}
