import { DeepPartial, getManager } from 'typeorm';

import { Notification } from '../../modules/notification/notification.entity';

import { createUser } from './user.factory';
import { createSubscription } from './subscription.factory';

export const createNotification = async (data: DeepPartial<Notification> = {}) => {
  const manager = await getManager();

  if (!data.actor)
    data.actor = await createUser();

  if (!data.subscription)
    data.subscription = await createSubscription();

  const notification = manager.create(Notification, {
    ...data,
  });

  return manager.save(notification);
};
