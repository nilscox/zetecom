import { expect } from 'earljs';

import { createComment, createCommentsArea } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectCommentsArea, setCommentsArea } from '../../../../store/normalize';

import { updateCommentsArea } from './updateCommentsArea';

describe('updateCommentsArea', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('updates a comments area entity', () => {
    const commentsArea = createCommentsArea({ comments: [] });
    const comment = createComment();

    store.dispatch(setCommentsArea(commentsArea));

    store.dispatch(updateCommentsArea(commentsArea.id, { comments: [comment] }));

    expect(store.select(selectCommentsArea, commentsArea.id)).toEqual({
      ...commentsArea,
      comments: [comment],
    });
  });
});
