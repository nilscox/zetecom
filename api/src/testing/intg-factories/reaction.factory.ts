import { DeepPartial, getManager } from 'typeorm';

import { Reaction, ReactionType } from 'src/modules/comment/reaction.entity';

import { createComment } from './comment.factory';
import { createUser } from './user.factory';

export const createReaction = async (data: DeepPartial<Reaction> = {}) => {
  const manager = getManager();

  if (!data.user)
    data.user = await createUser();

  if (!data.comment)
    data.comment = await createComment();

  const reaction = manager.create(Reaction, {
    type: ReactionType.APPROVE,
    ...data,
  });

  return manager.save(reaction);
};
