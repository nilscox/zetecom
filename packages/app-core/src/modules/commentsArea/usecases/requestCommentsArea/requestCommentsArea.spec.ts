import { expect } from 'earljs';

import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectCommentsAreaRequested, selectIsRequestingCommentsArea } from '../..';

import { requestCommentsArea } from './requestCommentsArea';

describe('requestCommentsArea', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  beforeEach(() => {
    store = new MemoryStore();

    ({ commentsAreaGateway } = store.dependencies);

    commentsAreaGateway.requestCommentsArea.resolvesToOnce(undefined);
  });

  it('requests to open a comments area', async () => {
    await store.dispatch(requestCommentsArea('identifier', 'pageUrl'));

    expect(store.select(selectCommentsAreaRequested)).toEqual(true);
    expect(commentsAreaGateway.requestCommentsArea).toHaveBeenCalledWith(['identifier', 'pageUrl']);
  });

  it('notifies that the comments area is being requested', async () => {
    await store.testLoadingState(requestCommentsArea('identifier', 'pageUrl'), selectIsRequestingCommentsArea);
  });
});
