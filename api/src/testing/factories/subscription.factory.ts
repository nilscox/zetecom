import { DeepPartial, getManager } from 'typeorm';

import { CommentSubscription } from '../../modules/subscription/subscription.entity';

import { createUser } from './user.factory';

export const createCommentSubscription = async (data: DeepPartial<CommentSubscription> = {}) => {
  const manager = getManager();

  if (!data.user)
    data.user = await createUser();

  const subscription = manager.create(CommentSubscription, {
    ...data,
  });

  return manager.save(subscription);
};
