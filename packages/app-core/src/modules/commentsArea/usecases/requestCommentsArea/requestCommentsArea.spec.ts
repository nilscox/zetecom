import { expect } from 'earljs';

import { MockCommentsAreaGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectCommentsAreaRequested, selectIsRequestingCommentsArea } from '../..';

import { requestCommentsArea } from './requestCommentsArea';

describe('requestCommentsArea', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();

    ({ commentsAreaGateway, trackingGateway } = store.dependencies);

    commentsAreaGateway.requestCommentsArea.resolvesToOnce(undefined);
  });

  const execute = () => {
    return store.dispatch(requestCommentsArea('identifier', 'pageUrl'));
  };

  it('requests to open a comments area', async () => {
    await execute();

    expect(store.select(selectCommentsAreaRequested)).toEqual(true);
    expect(commentsAreaGateway.requestCommentsArea).toHaveBeenCalledWith(['identifier', 'pageUrl']);
  });

  it('notifies that the comments area is being requested', async () => {
    await store.testLoadingState(requestCommentsArea('identifier', 'pageUrl'), selectIsRequestingCommentsArea);
  });

  it('tracks a comments area requested event', async () => {
    await execute();

    expect(trackingGateway.track).toHaveBeenCalledWith([
      { category: 'comments-area', action: 'comments area requested' },
    ]);
  });
});
