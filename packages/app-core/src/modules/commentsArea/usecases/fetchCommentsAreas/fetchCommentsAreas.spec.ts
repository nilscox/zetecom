import { expect } from 'earljs';

import { CommentsArea, commentsAreaEntityToDto, createCommentsArea } from '../../../../entities';
import { paginated } from '../../../../shared';
import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectCommentsAreas, selectIsFetchingCommentsAreas } from '../../selectors';

import { fetchCommentsAreas } from './fetchCommentsAreas';

describe('fetchComments', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway } = store.dependencies);
  });

  const setup = (commentsAreas: CommentsArea[]) => {
    commentsAreaGateway.fetchCommentsAreas.resolvesToOnce(paginated(commentsAreas.map(commentsAreaEntityToDto)));
  };

  it('fetches the comments areas', async () => {
    const commentsArea = createCommentsArea();

    setup([commentsArea]);

    await store.dispatch(fetchCommentsAreas());

    expect(store.select(selectCommentsAreas)).toEqual([commentsArea]);
  });

  it('notifies that the comments areas are being fetched', async () => {
    setup([]);

    const promise = store.dispatch(fetchCommentsAreas());

    expect(store.select(selectIsFetchingCommentsAreas)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingCommentsAreas)).toEqual(false);
  });
});
