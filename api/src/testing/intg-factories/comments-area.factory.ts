import { DeepPartial, getManager } from 'typeorm';

import { CommentsArea, CommentsAreaStatus } from 'src/modules/comments-area/comments-area.entity';

export const createCommentsArea = async (data: DeepPartial<CommentsArea> = {}) => {
  const manager = getManager();

  const commentsArea = manager.create(CommentsArea, {
    status: CommentsAreaStatus.open,
    ...data,
  });

  return manager.save(commentsArea);
};
