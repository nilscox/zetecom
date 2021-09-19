import { expect } from 'earljs';

import { createCommentsArea, SortType } from '../../../../entities';
import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { setCurrentCommentsArea } from '../../actions';
import { selectCommentsSort } from '../../selectors';

import { sortComments } from './sortComments';

describe('sortComments', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway } = store.dependencies);
  });

  const setup = () => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    commentsAreaGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  it('sorts the comments list according to a sort order', async () => {
    const sort = SortType.dateDesc;

    setup();

    await store.dispatch(sortComments(sort));

    expect(commentsAreaGateway.fetchRootComments).toHaveBeenCalledWith([commentsArea.id, expect.objectWith({ sort })]);
    expect(store.select(selectCommentsSort)).toEqual(sort);
  });
});
