import { Mock, mockFn } from 'earljs';

import { RouterGateway } from '../gateways/RouterGateway';
import { CommentGateway, Dependencies, TimerGateway } from '../index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockFn<F extends (...args: any[]) => any> = Mock<Parameters<F>, ReturnType<F>>;

export class MockCommentGateway implements CommentGateway {
  fetchCommentsArea: MockFn<CommentGateway['fetchCommentsArea']> = mockFn();
  fetchRootComments: MockFn<CommentGateway['fetchRootComments']> = mockFn();
  searchComments: MockFn<CommentGateway['searchComments']> = mockFn();
  fetchReplies: MockFn<CommentGateway['fetchReplies']> = mockFn();
  createComment: MockFn<CommentGateway['createComment']> = mockFn();
  editComment: MockFn<CommentGateway['editComment']> = mockFn();
  setSubscription: MockFn<CommentGateway['setSubscription']> = mockFn();
  updateReaction: MockFn<CommentGateway['updateReaction']> = mockFn();
  reportComment: MockFn<CommentGateway['reportComment']> = mockFn();
}

export class MockRouterGateway implements RouterGateway {
  openPopup: MockFn<RouterGateway['openPopup']> = mockFn();
}

export class FakeTimerGateway implements TimerGateway {
  timeout?: () => void;

  setTimeout(cb: () => void, _ms: number): NodeJS.Timeout {
    this.timeout = cb;

    return null as never;
  }

  clearTimeout(_timeout: NodeJS.Timeout): void {
    this.timeout = undefined;
  }

  invokeTimeout() {
    const result = this.timeout?.();

    this.timeout = undefined;

    return result;
  }
}

export interface MockDependencies extends Dependencies {
  commentGateway: MockCommentGateway;
  routerGateway: MockRouterGateway;
  timerGateway: FakeTimerGateway;
}
