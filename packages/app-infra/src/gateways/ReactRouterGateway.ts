import { RouterGateway } from '@zetecom/app-core';
import { History } from 'history';

export class ReactRouterGateway implements RouterGateway {
  constructor(private readonly history: History) {}

  private get isPopup() {
    return this.pathname.startsWith('/popup');
  }

  get pathname() {
    return this.history.location.pathname;
  }

  push(pathname: string): void {
    const prefix = this.isPopup ? '/popup' : '';

    // eslint-disable-next-line no-console
    console.log('push', prefix + pathname);

    this.history.push(prefix + pathname);
  }

  openPopup(pathname: string): void {
    const width = 1000;
    const height = 800;

    window.open(pathname, '_blank', `width=${width},height=${height},resizable=no`);
  }

  closePopup(): void {
    window.close();
  }
}
