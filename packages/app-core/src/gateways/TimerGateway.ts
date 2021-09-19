export interface TimerGateway {
  setTimeout(cb: () => void, ms: number): NodeJS.Timeout;
  clearTimeout(timeout: NodeJS.Timeout): void;

  setInterval(cb: () => void, ms: number): NodeJS.Timer;
  clearInterval(interval: NodeJS.Timer): void;
}
