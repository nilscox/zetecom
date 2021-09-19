import { TimerGateway } from '@zetecom/app-core';

export class RealTimerGateway implements TimerGateway {
  setTimeout = window.setTimeout.bind(window);

  clearTimeout = window.clearTimeout.bind(window);

  setInterval = window.setInterval.bind(window);

  clearInterval = window.clearInterval.bind(window);
}
