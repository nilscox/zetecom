import { DeepPartial, getManager } from 'typeorm';

import { Message } from './message.entity';

export const createMessage = async (data: DeepPartial<Message> = {}) => {
  const manager = getManager();

  if (!data.text)
    data.text = 'message text';

  return manager.save(Message, data);
};
