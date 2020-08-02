import { DeepPartial, getManager } from 'typeorm';

import { Message } from '../../modules/comment/message.entity';

export const createMessage = async (data: DeepPartial<Message> = {}) => {
  const manager = getManager();

  const message = manager.create(Message, {
    text: 'Text',
    ...data,
  });

  return manager.save(message);
};
