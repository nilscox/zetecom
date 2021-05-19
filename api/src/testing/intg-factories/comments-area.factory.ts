import { DeepPartial, getManager } from 'typeorm';

import { CommentsArea, CommentsAreaStatus } from 'src/modules/comments-area/comments-area.entity';

export const createCommentsArea = async (data: DeepPartial<CommentsArea> = {}) => {
  const manager = getManager();

  const commentsArea = manager.create(CommentsArea, {
    status: CommentsAreaStatus.open,
    informationTitle: 'Fake News!',
    informationUrl: 'https://information.url',
    informationAuthor: 'anyone',
    informationPublicationDate: new Date(),
    ...data,
  });

  return manager.save(commentsArea);
};
