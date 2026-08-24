interface Animation09DebugApi {
  pause(): void;
  play(): void;
  seek(frame: number): void;
  readonly currentFrame: number;
}

interface Window {
  animation09: Animation09DebugApi;
}
