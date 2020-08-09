import { DeepPartial, getManager } from 'typeorm';

import { Notification } from '../../modules/notification/notification.entity';

export const createNotification = async (data: DeepPartial<Notification> = {}) => {
  const manager = getManager();

  const notification = manager.create(Notification, {
    ...data,
  });

  return manager.save(notification);
};
