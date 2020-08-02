import { DeepPartial, getManager } from 'typeorm';

import { Comment } from '../../modules/comment/comment.entity';

import { createInformation } from './information.factory';
import { createMessage } from './message.factory';
import { createUser } from './user.factory';

export const createComment = async (data: DeepPartial<Comment> = {}) => {
  const manager = getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.message)
    data.message = await createMessage();

  const comment = manager.create(Comment, {
    ...data,
  });

  const result = await manager.save(comment);

  if (data.history) {
    await Promise.all(data.history.map(message => {
      message.comment = result;
      return manager.save(message);
    }));
  }

  data.message.comment = comment;
  await manager.save(data.message);
  await manager.query(`UPDATE message SET created = NOW() WHERE id = ${data.message.id}`);

  return result;
};
