import { expect } from 'earljs';

import { createComment } from '../../../../entities';
import { FakeTimerGateway, MockCommentGateway, MockRouterGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectIsReportingComment } from '../../selectors';

import { reportComment } from './reportComment';

describe('reportComment', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;
  let timerGateway: FakeTimerGateway;
  let routerGateway: MockRouterGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway, timerGateway, routerGateway, trackingGateway } = store.dependencies);
  });

  const setup = () => {
    commentGateway.reportComment.resolvesToOnce(undefined);
    routerGateway.closePopup.returnsOnce(undefined);
  };

  const execute = (message?: string) => store.dispatch(reportComment(comment.id, message));

  const comment = createComment();

  it('reports a comment', async () => {
    setup();

    await execute('message');

    expect(commentGateway.reportComment).toHaveBeenCalledWith([comment.id, 'message']);
  });

  it('notifies that the comment is being reported', async () => {
    setup();

    const promise = store.dispatch(reportComment(comment.id));

    expect(store.select(selectIsReportingComment)).toEqual(true);

    await promise;

    expect(store.select(selectIsReportingComment)).toEqual(false);
  });

  it('closes the dialog after a timeout', async () => {
    setup();

    await store.dispatch(reportComment(comment.id));

    expect(routerGateway.closePopup).not.toBeExhausted();

    timerGateway.invokeTimeout();

    expect(routerGateway.closePopup).toBeExhausted();
  });

  it('tracks a comment reported event', async () => {
    setup();

    await store.dispatch(reportComment(comment.id));

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'comment', action: 'comment reported' }]);
  });
});
