import { expect, mockFn } from 'earljs';

import { createCommentsArea } from '../../../../entities/CommentsArea';
import { FakeTimerGateway, MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { setCommentsSearchQuery, setCurrentCommentsArea } from '../../commentsAreaActions';
import { selectCommentsSearchQuery } from '../../selectors/commentsAreaSelectors';

import { searchComments } from './searchComments';

describe('searchComments', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;
  let timerGateway: FakeTimerGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    ({ dispatch, getState, commentGateway, timerGateway } = createMemoryStore());
  });

  const setup = () => {
    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));

    commentGateway.searchComments.resolvesToOnce(paginated([]));
  };

  const execute = async (query: string) => {
    await dispatch(searchComments(query));
    await timerGateway.invokeTimeout();
  };

  it('filters the comments list according to a search query', async () => {
    const query = 'query';

    setup();

    await execute(query);

    expect(commentGateway.searchComments).toHaveBeenCalledWith([commentsArea.id, query, expect.anything()]);
    expect(selectCommentsSearchQuery(getState())).toEqual(query);
  });

  it("clears the comments' search query ", async () => {
    setup();

    dispatch(setCommentsSearchQuery('query'));
    commentGateway.fetchRootComments.resolvesToOnce(paginated([]));

    await execute('');

    expect(commentGateway.fetchRootComments).toBeExhausted();
    expect(selectCommentsSearchQuery(getState())).toEqual(undefined);
  });

  it('debounces the search query', async () => {
    setup();

    timerGateway.clearTimeout = mockFn().returns(undefined);

    await dispatch(searchComments('query1'));
    await dispatch(searchComments('query2'));
    await timerGateway.invokeTimeout();

    expect(selectCommentsSearchQuery(getState())).toEqual('query2');
    expect(timerGateway.clearTimeout).toBeExhausted();
  });
});
