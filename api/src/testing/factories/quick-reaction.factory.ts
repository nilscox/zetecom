import { DeepPartial, getManager } from 'typeorm';

import { QuickReaction, QuickReactionType } from '../../modules/reaction/quick-reaction.entity';

import { createReaction } from './reaction.factory';
import { createUser } from './user.factory';

export const createQuickReaction = async (data: DeepPartial<QuickReaction> = {}) => {
  const manager = getManager();

  if (!data.user)
    data.user = await createUser();

  if (!data.reaction)
    data.user = await createReaction();

  const quickReaction = manager.create(QuickReaction, {
    type: QuickReactionType.APPROVE,
    ...data,
  });

  return manager.save(quickReaction);
};
