import { DeepPartial, getManager } from 'typeorm';

import { Subject } from '../../modules/subject/subject.entity';

import { createInformation } from './information.factory';
import { createUser } from './user.factory';
import { createMessage } from './message.factory';

export const createSubject = async (data: DeepPartial<Subject> = {}) => {
  const manager = await getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.messages)
    data.messages = [await createMessage()];

  const subject = manager.create(Subject, {
    subject: 'Subject',
    quote: 'Quote',
    ...data,
  });

  return manager.save(subject);
};
