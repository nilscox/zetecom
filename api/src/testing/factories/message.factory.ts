import { DeepPartial, getManager } from 'typeorm';

import { Message } from '../../modules/reaction/message.entity';

export const createMessage = async (data: DeepPartial<Message> = {}) => {
  const manager = await getManager();

  const message = manager.create(Message, {
    text: 'Text',
    ...data,
  });

  return manager.save(message);
};
