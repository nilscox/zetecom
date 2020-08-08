import { DeepPartial, getManager } from 'typeorm';

import { Comment } from '../../modules/comment/comment.entity';
import { Message } from '../../modules/comment/message.entity';

import { createInformation } from './information.factory';
import { createMessage } from './message.factory';
import { createUser } from './user.factory';

export const createComment = async (data: DeepPartial<Comment> = {}, text?: string) => {
  const manager = getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.message)
    data.message = await createMessage({ text });

  const comment = await manager.save(Comment, data);

  data.message.comment = comment;
  await manager.save(Message, data.message);

  return manager.findOne(Comment, comment.id);
};
