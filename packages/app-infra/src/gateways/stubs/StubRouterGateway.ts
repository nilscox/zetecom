/* eslint-disable no-console */

import { RouterGateway } from '@zetecom/app-core';

export class StubRouterGateway implements RouterGateway {
  public pathname = '/';

  push(pathname: string): void {
    console.log('push', { pathname });
  }

  openPopup(pathname: string) {
    console.log('open popup', { pathname });
  }

  closePopup() {
    console.log('close popup');
  }
}
