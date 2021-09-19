import { expect } from 'earljs';

import { createComment } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { updateComment } from './updateComment';

describe('updateComment', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('updates a comment entity', () => {
    const comment = createComment({ edited: false });
    const now = new Date();

    store.dispatch(setComment(comment));

    store.dispatch(updateComment(comment.id, { edited: now }));

    expect(store.select(selectComment, comment.id)).toEqual({
      ...comment,
      edited: now,
    });
  });
});
