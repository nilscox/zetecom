import { parseSubscription, Subscription } from './Subscription';
import { parseUser, User } from './User';

export type Notification = {
  id: number;
  subscription: Subscription;
  created: Date;
  actor: User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNotification = (data: any) => {
  return {
    ...data,
    subscription: parseSubscription(data.subscription),
    created: new Date(data.created),
    actor: parseUser(data.actor),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNotificationsCount = (data: any) => {
  return data.count;
};
