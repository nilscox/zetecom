/* eslint-disable no-console */

import { NotificationGateway } from '@zetecom/app-core/gateways/NotificationGateway';

export class StubNotificationGateway implements NotificationGateway {
  success(text: string) {
    console.log('Success notification: ' + text);
  }

  info(text: string) {
    console.log('Info notification: ' + text);
  }

  warning(text: string) {
    console.log('Warning notification: ' + text);
  }

  error(text: string) {
    console.log('Error notification: ' + text);
  }
}
