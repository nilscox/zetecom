import { expect } from 'earljs';

import { createComment } from '../../../../entities/Comment';
import { createCommentsArea } from '../../../../entities/CommentsArea';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectCommentsArea, setCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { updateCommentsArea } from './updateCommentsArea';

describe('updateCommentsArea', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  it('updates a comments area entity', () => {
    const commentsArea = createCommentsArea({ comments: [] });
    const comment = createComment();

    dispatch(setCommentsArea(commentsArea));

    dispatch(updateCommentsArea(commentsArea.id, { comments: [comment] }));

    expect(selectCommentsArea(getState(), commentsArea.id)).toEqual({
      ...commentsArea,
      comments: [comment],
    });
  });
});
