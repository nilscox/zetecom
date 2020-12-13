import { DeepPartial, getManager } from 'typeorm';

import { CommentsArea } from '../../modules/comments-area/comments-area.entity';

import { createUser } from './user.factory';

export const createCommentsArea = async (data: DeepPartial<CommentsArea> = {}) => {
  const manager = getManager();

  if (!data.creator) data.creator = await createUser();

  const commentsArea = manager.create(CommentsArea, {
    informationTitle: 'Fake News!',
    informationUrl: 'https://information.url',
    informationAuthor: 'anyone',
    informationPublicationDate: new Date(),
    ...data,
  });

  return manager.save(commentsArea);
};
