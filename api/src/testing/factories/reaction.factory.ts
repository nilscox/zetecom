import { DeepPartial, getManager } from 'typeorm';

import { Reaction } from '../../modules/reaction/reaction.entity';

import { createInformation } from './information.factory';
import { createMessage } from './message.factory';
import { createUser } from './user.factory';

export const createReaction = async (data: DeepPartial<Reaction> = {}) => {
  const manager = getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.message)
    data.message = await createMessage();

  const reaction = manager.create(Reaction, {
    ...data,
  });

  const result = await manager.save(reaction);

  if (data.history) {
    await Promise.all(data.history.map(message => {
      message.reaction = result;
      return manager.save(message);
    }));
  }

  data.message.reaction = reaction;
  await manager.save(data.message);
  await manager.query(`UPDATE message SET created = NOW() WHERE id = ${data.message.id}`);

  return result;
};
