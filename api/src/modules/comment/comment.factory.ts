import { DeepPartial, getManager } from 'typeorm';

import { Comment } from '../../modules/comment/comment.entity';
import { createInformation } from '../../testing/factories/information.factory';
import { createUser } from '../../testing/factories/user.factory';

import { createMessage } from './message/message.factory';

export const createComment = async (data: DeepPartial<Comment> = {}) => {
  const manager = getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.message) {
    data.message = await createMessage();
    data.history = [data.message];
  }

  const comment = manager.create(Comment, data);

  return manager.save(comment);
};
