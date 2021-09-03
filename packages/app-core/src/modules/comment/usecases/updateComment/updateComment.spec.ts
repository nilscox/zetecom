import { expect } from 'earljs';

import { createComment } from '../../../../entities/Comment';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { updateComment } from './updateComment';

describe('updateComment', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  it('updates a comment entity', () => {
    const comment = createComment({ edited: false });
    const now = new Date();

    dispatch(setComment(comment));

    dispatch(updateComment(comment.id, { edited: now }));

    expect(selectComment(getState(), comment.id)).toEqual({
      ...comment,
      edited: now,
    });
  });
});
