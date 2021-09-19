import { expect } from 'earljs';

import { createCommentsArea } from '../../../../entities';
import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { setCommentsPage, setCurrentCommentsArea } from '../../actions';
import { selectCommentsPage } from '../../selectors';

import { firstCommentsPage, lastCommentsPage, nextCommentsPage, previousCommentsPage } from './setCommentsPage';

describe('setCommentsPage', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway } = store.dependencies);
  });

  const setup = (currentPage: number) => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));
    store.dispatch(setCommentsPage(currentPage));

    commentsAreaGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  const expectFetchedPage = (expected: number) => {
    expect(commentsAreaGateway.fetchRootComments).toHaveBeenCalledWith([
      commentsArea.id,
      expect.objectWith({ page: expected }),
    ]);

    expect(store.select(selectCommentsPage)).toEqual(expected);
  };

  it("fetches a comments area's comments on the previous page", async () => {
    setup(2);

    await store.dispatch(previousCommentsPage());

    expectFetchedPage(1);
  });

  it("fetches a comments area's comments on the next page", async () => {
    setup(1);

    await store.dispatch(nextCommentsPage());

    expectFetchedPage(2);
  });

  it("fetches a comments area's comments on the first page", async () => {
    setup(3);

    await store.dispatch(firstCommentsPage());

    expectFetchedPage(1);
  });

  it("fetches a comments area's comments on the last page", async () => {
    setup(1);

    store.dispatch(setCommentsArea(createCommentsArea({ id: commentsArea.id, commentsCount: 30 })));

    await store.dispatch(lastCommentsPage());

    expectFetchedPage(3);
  });
});
