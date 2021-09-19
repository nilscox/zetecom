import { expect } from 'earljs';

import { CommentsArea, createCommentsArea, SortType } from '../../../../entities';
import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { setCommentsPage, setCommentsSearchQuery, setCommentsSort, setCurrentCommentsArea } from '../../actions';
import { selectIsFetchingComments } from '../../selectors';

import { fetchComments } from './fetchComments';

describe('fetchComments', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway } = store.dependencies);
  });

  const setup = (commentsArea: CommentsArea) => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    commentsAreaGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  it("notifies that a comments area's comments are being fetched", async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea);

    const promise = store.dispatch(fetchComments());

    expect(store.select(selectIsFetchingComments)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingComments)).toEqual(false);
  });

  it("fetches a comments area's comments with mixed options", async () => {
    const page = 3;
    const sort = SortType.dateAsc;
    const query = 'query';

    const commentsArea = createCommentsArea();

    commentsAreaGateway.searchComments.resolvesToOnce(paginated([]));

    setup(commentsArea);

    store.dispatch(setCommentsPage(page));
    store.dispatch(setCommentsSort(sort));
    store.dispatch(setCommentsSearchQuery(query));

    await store.dispatch(fetchComments());

    expect(commentsAreaGateway.searchComments).toHaveBeenCalledWith([
      commentsArea.id,
      query,
      { page, pageSize: expect.a(Number), sort },
    ]);
  });
});
