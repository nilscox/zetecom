import { DeepPartial, getManager } from 'typeorm';

import { Subscription } from '../../modules/subscription/subscription.entity';

import { createUser } from './user.factory';

export const createSubscription = async (data: DeepPartial<Subscription> = {}) => {
  const manager = getManager();

  if (!data.user)
    data.user = await createUser();

  const subscription = manager.create(Subscription, {
    ...data,
  });

  return manager.save(subscription);
};
