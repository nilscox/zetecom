import { Subscription, parseSubscription } from './Subscription';
import { User, parseUser } from './User';

export type Notification = {
  id: number;
  subscription: Subscription;
  created: Date;
  actor: User;
};

export const parseNotification = (data: any) => {
  return {
    ...data,
    subscription: parseSubscription(data.subscription),
    created: new Date(data.created),
    actor: parseUser(data.actor),
  };
};
