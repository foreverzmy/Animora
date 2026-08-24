export interface FFDecRootMovie {
    readonly period: number;
    readonly ready: Promise<unknown>;
    draw(canvas: HTMLCanvasElement, frame: number): void;
}
declare global {
    interface Window {
        FFDecRootMovies?: Record<string, FFDecRootMovie>;
    }
}
export interface FFDecStackOptions {
    canvas: HTMLCanvasElement;
    movieNames: readonly string[];
    width: number;
    height: number;
    fps: number;
    background: string;
    backgroundFrame?: string;
}
export declare class FFDecStackPlayer {
    #private;
    readonly durationFrames: number;
    readonly fps: number;
    private constructor();
    static create(options: FFDecStackOptions): Promise<FFDecStackPlayer>;
    get currentFrame(): number;
    get playing(): boolean;
    play(): void;
    pause(): void;
    seek(frame: number): void;
    render(): void;
    destroy(): void;
}
