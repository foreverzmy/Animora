export type Matrix = readonly [number, number, number, number, number, number];
export type FrameMode = "loop" | "clamp";
export interface FrameAsset {
    src: string;
    size: readonly [number, number];
    origin?: readonly [number, number];
}
export interface Sequence {
    frames: readonly FrameAsset[];
    space: "pixels" | "flash";
}
export interface Layer {
    sequence: string;
    matrix?: Matrix;
    offset?: number;
    mode?: FrameMode;
}
export interface TimelineManifest {
    version: 1;
    stage: {
        width: number;
        height: number;
        background: string;
    };
    fps: number;
    durationFrames: number;
    sequences: Record<string, Sequence>;
    layers: readonly Layer[];
    audio?: {
        src: string;
        loop?: boolean;
    };
}
export interface PlayerOptions {
    canvas: HTMLCanvasElement;
    manifestUrl?: string;
    autoplay?: boolean;
    lookaheadFrames?: number;
}
export interface TimelineDebugApi {
    readonly currentFrame: number;
    pause(): void;
    play(): void;
    seek(frame: number): Promise<void>;
}
export declare class FrameClock {
    readonly fps: number;
    private readonly onFrame;
    private anchorFrame;
    private anchorTime;
    private shownFrame;
    private requestId;
    private running;
    constructor(fps: number, onFrame: (frame: number) => void);
    get currentFrame(): number;
    start(): void;
    play(): void;
    pause(): void;
    seek(frame: number): void;
    private readonly tick;
    private show;
}
export declare class CanvasTimelinePlayer implements TimelineDebugApi {
    readonly manifest: TimelineManifest;
    private readonly context;
    private readonly assetBase;
    private readonly clock;
    private readonly lookaheadFrames;
    private readonly images;
    private readonly pending;
    private readonly audio?;
    private wantedFrame;
    private constructor();
    static create(options: PlayerOptions): Promise<CanvasTimelinePlayer>;
    get currentFrame(): number;
    pause(): void;
    play(): void;
    seek(frame: number): Promise<void>;
    private request;
    private draw;
    private ensureFrame;
    private sequence;
    private load;
    private startAudio;
}
