import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

import { Comment } from './Comment';
import { createInformation, Information } from './Information';

export interface CommentsArea {
  id: string;
  information: Information;
  commentsCount: number;
  comments: Comment[];
}

export const createCommentsArea: Factory<CommentsArea> = (overrides = {}) => ({
  id: createId(),
  information: createInformation(),
  comments: [],
  commentsCount: 0,
  ...overrides,
});
