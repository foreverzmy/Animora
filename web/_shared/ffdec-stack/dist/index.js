function loadImage(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image), { once: true });
        image.addEventListener("error", () => reject(new Error(`Unable to load ${source}`)), { once: true });
        image.src = source;
    });
}
export class FFDecStackPlayer {
    durationFrames;
    fps;
    #canvas;
    #context;
    #movies;
    #background;
    #backgroundFrame;
    #frame = 0;
    #playing = false;
    #animationFrame = 0;
    #lastTimestamp = null;
    #accumulator = 0;
    constructor(options, movies, backgroundFrame) {
        this.#canvas = options.canvas;
        const context = options.canvas.getContext("2d", { alpha: true });
        if (!context)
            throw new Error("Canvas 2D is unavailable");
        this.#context = context;
        this.#movies = movies;
        this.#background = options.background;
        this.#backgroundFrame = backgroundFrame;
        this.fps = options.fps;
        this.durationFrames = Math.max(1, ...movies.map((movie) => movie.period));
        options.canvas.width = options.width;
        options.canvas.height = options.height;
        this.render();
    }
    static async create(options) {
        const registry = window.FFDecRootMovies;
        if (!registry)
            throw new Error("FFDec root movie runtimes were not loaded");
        const movies = options.movieNames.map((name) => {
            const movie = registry[name];
            if (!movie)
                throw new Error(`Missing FFDec root movie runtime: ${name}`);
            return movie;
        });
        const [backgroundFrame] = await Promise.all([
            options.backgroundFrame ? loadImage(options.backgroundFrame) : Promise.resolve(null),
            ...movies.map((movie) => movie.ready)
        ]);
        return new FFDecStackPlayer(options, movies, backgroundFrame);
    }
    get currentFrame() {
        return this.#frame;
    }
    get playing() {
        return this.#playing;
    }
    play() {
        if (this.#playing)
            return;
        this.#playing = true;
        this.#lastTimestamp = null;
        this.#animationFrame = requestAnimationFrame(this.#tick);
    }
    pause() {
        this.#playing = false;
        cancelAnimationFrame(this.#animationFrame);
        this.#lastTimestamp = null;
        this.#accumulator = 0;
    }
    seek(frame) {
        if (!Number.isFinite(frame))
            throw new Error(`Invalid frame: ${frame}`);
        this.#frame = Math.max(0, Math.floor(frame));
        this.render();
    }
    render() {
        const context = this.#context;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.globalAlpha = 1;
        context.globalCompositeOperation = "source-over";
        context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        context.fillStyle = this.#background;
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        if (this.#backgroundFrame)
            context.drawImage(this.#backgroundFrame, 0, 0);
        for (const movie of this.#movies)
            movie.draw(this.#canvas, this.#frame);
    }
    destroy() {
        this.pause();
    }
    #tick = (timestamp) => {
        if (!this.#playing)
            return;
        if (this.#lastTimestamp === null)
            this.#lastTimestamp = timestamp;
        const elapsed = Math.min(250, timestamp - this.#lastTimestamp);
        this.#lastTimestamp = timestamp;
        this.#accumulator += elapsed;
        const frameDuration = 1000 / this.fps;
        const steps = Math.floor(this.#accumulator / frameDuration);
        if (steps > 0) {
            this.#accumulator -= steps * frameDuration;
            this.#frame += steps;
            this.render();
        }
        this.#animationFrame = requestAnimationFrame(this.#tick);
    };
}
