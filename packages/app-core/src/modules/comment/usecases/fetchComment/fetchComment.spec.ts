import { expect } from 'earljs';

import { commentEntityToDto, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, selectIsFetchingComment } from '../../selectors';

import { fetchComment } from './fetchComment';

describe('fetchComment', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const setup = () => {
    commentGateway.fetchComment.resolvesToOnce(commentEntityToDto(comment));
  };

  const execute = () => store.dispatch(fetchComment(comment.id));

  const comment = createComment();

  it('fetches a comment', async () => {
    setup();

    await execute();

    expect(store.select(selectComment, comment.id)).toEqual(comment);
  });

  it('notifies that the comment is being fetched', async () => {
    setup();

    const promise = store.dispatch(fetchComment(comment.id));

    expect(store.select(selectIsFetchingComment)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingComment)).toEqual(false);
  });
});
