export interface TimerGateway {
  setTimeout(cb: () => void, ms: number): NodeJS.Timeout;
  clearTimeout(timeout: NodeJS.Timeout): void;
}
