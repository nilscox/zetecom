import { DeepPartial, getManager } from 'typeorm';

import { CommentsArea } from '../../modules/comments-area/comments-area.entity';

import { createUser } from './user.factory';

export const createCommentsArea = async (data: DeepPartial<CommentsArea> = {}) => {
  const manager = getManager();

  if (!data.creator)
    data.creator = await createUser();

  const rnd = Math.random().toString(36).slice(6);

  const commentsArea = manager.create(CommentsArea, {
    identifier: `id:${rnd}`,
    informationTitle: 'Fake News!',
    informationUrl: 'https://information.url',
    informationAuthor: 'anyone',
    ...data,
  });

  return manager.save(commentsArea);
};
