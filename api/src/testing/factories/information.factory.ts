import { DeepPartial, getManager } from 'typeorm';

import { Information } from '../../modules/information/information.entity';

import { createUser } from './user.factory';

export const createInformation = async (data: DeepPartial<Information> = {}) => {
  const manager = getManager();

  if (!data.creator)
    data.creator = await createUser();

  const rnd = Math.random().toString(36).slice(6);

  const information = manager.create(Information, {
    identifier: `id:${rnd}`,
    title: 'Fake News!',
    ...data,
  });

  return manager.save(information);
};
