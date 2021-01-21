import { DeepPartial, getManager } from 'typeorm';

import { Message } from 'src/modules/comment/message.entity';

export const createMessage = async (data: DeepPartial<Message> = {}) => {
  const manager = getManager();

  if (!data.text)
    data.text = 'text';

  return manager.save(Message, data);
};
