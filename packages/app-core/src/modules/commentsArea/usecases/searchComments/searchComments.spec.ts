import { expect, mockFn } from 'earljs';

import { createCommentsArea } from '../../../../entities';
import { FakeTimerGateway, MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { setCommentsSearchQuery, setCurrentCommentsArea } from '../../actions';
import { selectCommentsSearchQuery, selectIsFetchingComments } from '../../selectors';

import { searchComments } from './searchComments';

describe('searchComments', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;
  let timerGateway: FakeTimerGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway, timerGateway } = store.dependencies);
  });

  const setup = () => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    commentsAreaGateway.searchComments.resolvesToOnce(paginated([]));
  };

  const execute = async (query: string) => {
    await store.dispatch(searchComments(query));
    await timerGateway.invokeTimeout();
  };

  it('filters the comments list according to a search query', async () => {
    const query = 'query';

    setup();

    await execute(query);

    expect(commentsAreaGateway.searchComments).toHaveBeenCalledWith([commentsArea.id, query, expect.anything()]);
    expect(store.select(selectCommentsSearchQuery)).toEqual(query);
  });

  it("clears the comments' search query ", async () => {
    setup();

    store.dispatch(setCommentsSearchQuery('query'));
    commentsAreaGateway.fetchRootComments.resolvesToOnce(paginated([]));

    await execute('');

    expect(commentsAreaGateway.fetchRootComments).toBeExhausted();
    expect(store.select(selectCommentsSearchQuery)).toEqual(undefined);
  });

  it('debounces the search query', async () => {
    setup();

    timerGateway.clearTimeout = mockFn().returns(undefined);

    await store.dispatch(searchComments('query1'));
    await store.dispatch(searchComments('query2'));

    expect(store.select(selectIsFetchingComments)).toEqual(true);

    await timerGateway.invokeTimeout();

    expect(store.select(selectCommentsSearchQuery)).toEqual('query2');
    expect(timerGateway.clearTimeout).toBeExhausted();
  });
});
