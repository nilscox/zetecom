import { DeepPartial, getManager } from 'typeorm';

import { ReactionSubscription } from '../../modules/subscription/subscription.entity';

import { createUser } from './user.factory';

export const createReactionSubscription = async (data: DeepPartial<ReactionSubscription> = {}) => {
  const manager = getManager();

  if (!data.user)
    data.user = await createUser();

  const subscription = manager.create(ReactionSubscription, {
    ...data,
  });

  return manager.save(subscription);
};
