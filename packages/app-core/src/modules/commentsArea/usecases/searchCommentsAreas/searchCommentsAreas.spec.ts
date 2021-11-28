import { expect, mockFn } from 'earljs';

import { CommentsArea, createCommentsArea } from '../../../../entities';
import { FakeTimerGateway, MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setCommentsAreas, setCommentsAreasSearchQuery } from '../../actions';
import { selectCommentsAreasSearchQuery, selectIsFetchingCommentsAreas } from '../../selectors';

import { searchCommentsAreas } from './searchCommentsAreas';

describe('searchCommentsAreas', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;
  let timerGateway: FakeTimerGateway;

  const commentsAreas: CommentsArea[] = Array(3)
    .fill(null)
    .map(() => createCommentsArea());

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway, timerGateway } = store.dependencies);
  });

  const setup = () => {
    store.dispatch(setCommentsAreas(commentsAreas));

    commentsAreaGateway.searchCommentsAreas.resolvesToOnce(paginated([]));
  };

  const execute = async (query: string) => {
    await store.dispatch(searchCommentsAreas(query));
    await timerGateway.invokeTimeout();
  };

  it('filters the comments areas list according to a search query', async () => {
    const query = 'query';

    setup();

    await execute(query);

    expect(commentsAreaGateway.searchCommentsAreas).toHaveBeenCalledWith([query]);
    expect(store.select(selectCommentsAreasSearchQuery)).toEqual(query);
  });

  it("clears the comments areas' search query ", async () => {
    setup();

    store.dispatch(setCommentsAreasSearchQuery('query'));
    commentsAreaGateway.fetchCommentsAreas.resolvesToOnce(paginated([]));

    await execute('');

    expect(commentsAreaGateway.fetchCommentsAreas).toBeExhausted();
    expect(store.select(selectCommentsAreasSearchQuery)).toEqual(undefined);
  });

  it('debounces the search query', async () => {
    setup();

    timerGateway.clearTimeout = mockFn().returns(undefined);

    await store.dispatch(searchCommentsAreas('query1'));
    await store.dispatch(searchCommentsAreas('query2'));

    expect(store.select(selectIsFetchingCommentsAreas)).toEqual(true);

    await timerGateway.invokeTimeout();

    expect(store.select(selectCommentsAreasSearchQuery)).toEqual('query2');
    expect(timerGateway.clearTimeout).toBeExhausted();
  });
});
