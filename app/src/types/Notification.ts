import env from '../utils/env';

type NotificationType = 'rulesUpdate' | 'subscriptionReply';

export class Notification {

  id: number;

  type: NotificationType;

  created: Date;

  seen: Date | false;

  payload: any;

  constructor(data: any) {
    Object.assign(this, {
      ...data,
      created: new Date(data.created),
      seen: data.seen ? new Date(data.seen) : false,
    });
  }

  getLink() {
    if (this.type === 'rulesUpdate')
      return { href: env.WEBSITE_URL + '/charte.html', external: true };

    if (this.type === 'subscriptionReply')
      return { href: '/information/' + this.payload.informationId, external: false };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNotification = (data: any) => {
  return new Notification(data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNotificationsCount = (data: any) => {
  return data.count;
};
