export interface TimerGateway {
  setTimeout(cb: () => void, ms: number): number;
  clearTimeout(timeout: number): void;

  setInterval(cb: () => void, ms: number): number;
  clearInterval(interval: number): void;
}
