import { pick } from '../shared';
import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

import { Comment } from './Comment';
import { createInformation, Information } from './Information';

export interface CommentsAreaDto {
  id: string;
  information: Information;
  commentsCount: number;
}

export interface CommentsArea extends CommentsAreaDto {
  comments: Comment[];
}

export const createCommentsArea: Factory<CommentsArea> = (overrides = {}) => ({
  id: createId(),
  information: createInformation(),
  comments: [],
  commentsCount: overrides.comments?.length ?? 0,
  ...overrides,
});

export const commentsAreaDtoToEntity = (commentsAreaDto: CommentsAreaDto): CommentsArea => {
  return { ...commentsAreaDto, comments: [] };
};

export const commentsAreaEntityToDto = (commentsArea: CommentsArea): CommentsAreaDto => {
  return pick(commentsArea, 'id', 'information', 'commentsCount');
};
