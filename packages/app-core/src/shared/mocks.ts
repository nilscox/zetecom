import { Mock, mockFn } from 'earljs';

import {
  CommentGateway,
  CommentsAreaGateway,
  DateGateway,
  ExtensionGateway,
  NotificationGateway,
  RouterGateway,
  TimerGateway,
  TrackingGateway,
  UserGateway,
} from '../gateways';
import { Dependencies } from '../store/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockFn<F extends (...args: any[]) => any> = Mock<Parameters<F>, ReturnType<F>>;

export class MockCommentsAreaGateway implements CommentsAreaGateway {
  fetchCommentsAreas: MockFn<CommentsAreaGateway['fetchCommentsAreas']> = mockFn();
  fetchCommentsArea: MockFn<CommentsAreaGateway['fetchCommentsArea']> = mockFn();
  fetchCommentsAreaByIdentifier: MockFn<CommentsAreaGateway['fetchCommentsAreaByIdentifier']> = mockFn();
  fetchRootComments: MockFn<CommentsAreaGateway['fetchRootComments']> = mockFn();
  searchComments: MockFn<CommentsAreaGateway['searchComments']> = mockFn();
  searchCommentsAreas: MockFn<CommentsAreaGateway['searchCommentsAreas']> = mockFn();
  requestCommentsArea: MockFn<CommentsAreaGateway['requestCommentsArea']> = mockFn();
}

export class MockCommentGateway implements CommentGateway {
  fetchComment: MockFn<CommentGateway['fetchComment']> = mockFn();
  fetchReplies: MockFn<CommentGateway['fetchReplies']> = mockFn();
  createComment: MockFn<CommentGateway['createComment']> = mockFn();
  editComment: MockFn<CommentGateway['editComment']> = mockFn();
  setSubscription: MockFn<CommentGateway['setSubscription']> = mockFn();
  updateReaction: MockFn<CommentGateway['updateReaction']> = mockFn();
  reportComment: MockFn<CommentGateway['reportComment']> = mockFn();
}

export class MockUserGateway implements UserGateway {
  login: MockFn<UserGateway['login']> = mockFn();
  signup: MockFn<UserGateway['signup']> = mockFn();
  requestAuthenticationLink: MockFn<UserGateway['requestAuthenticationLink']> = mockFn();
  logout: MockFn<UserGateway['logout']> = mockFn();
  validateEmail: MockFn<UserGateway['validateEmail']> = mockFn();
  changePassword: MockFn<UserGateway['changePassword']> = mockFn();
  authenticateWithToken: MockFn<UserGateway['authenticateWithToken']> = mockFn();
  fetchAuthenticatedUser: MockFn<UserGateway['fetchAuthenticatedUser']> = mockFn();
  fetchUnseenNotificationsCount: MockFn<UserGateway['fetchUnseenNotificationsCount']> = mockFn().resolvesTo(0);
  fetchUserNotifications: MockFn<UserGateway['fetchUserNotifications']> = mockFn();
  markNotificationAsSeen: MockFn<UserGateway['markNotificationAsSeen']> = mockFn();
}

export class MockNotificationGateway implements NotificationGateway {
  success: MockFn<NotificationGateway['success']> = mockFn().returns(undefined);
  info: MockFn<NotificationGateway['info']> = mockFn().returns(undefined);
  warning: MockFn<NotificationGateway['warning']> = mockFn().returns(undefined);
  error: MockFn<NotificationGateway['error']> = mockFn().returns(undefined);
}

export class MockRouterGateway implements RouterGateway {
  pathname = '/';

  push: MockFn<RouterGateway['push']> = mockFn();

  openPopup: MockFn<RouterGateway['openPopup']> = mockFn();
  closePopup: MockFn<RouterGateway['closePopup']> = mockFn();
}

export class MockExtensionGateway implements ExtensionGateway {
  setExtensionActive: MockFn<ExtensionGateway['setExtensionActive']> = mockFn();
  focusApp: MockFn<ExtensionGateway['focusApp']> = mockFn();
  getIntegrationState: MockFn<ExtensionGateway['getIntegrationState']> = mockFn();
  getExtensionConfig: MockFn<ExtensionGateway['getExtensionConfig']> = mockFn();
  setExtensionConfig: MockFn<ExtensionGateway['setExtensionConfig']> = mockFn();
}

export class MockTrackingGateway implements TrackingGateway {
  track: MockFn<TrackingGateway['track']> = mockFn().returns(undefined);
  pageView: MockFn<TrackingGateway['pageView']> = mockFn().returns(undefined);
}

export class FakeDateGateway implements DateGateway {
  now = new Date(2020, 0, 1);
}

export class FakeTimerGateway implements TimerGateway {
  timeout?: () => unknown;

  setTimeout(cb: () => unknown, _ms: number): number {
    this.timeout = cb;

    return 6;
  }

  clearTimeout(_timeout: number): void {
    this.timeout = undefined;
  }

  invokeTimeout<T>() {
    const result = this.timeout?.();

    this.timeout = undefined;

    return result as T;
  }

  interval?: () => unknown;

  setInterval(cb: () => void, _ms: number): number {
    this.interval = cb;

    return 6;
  }

  clearInterval(_interval: number): void {
    this.interval = undefined;
  }

  invokeInterval<T>() {
    return this.interval?.() as T;
  }
}

export interface MockDependencies extends Dependencies {
  commentsAreaGateway: MockCommentsAreaGateway;
  commentGateway: MockCommentGateway;
  userGateway: MockUserGateway;
  routerGateway: MockRouterGateway;
  extensionGateway: MockExtensionGateway;
  dateGateway: FakeDateGateway;
  timerGateway: FakeTimerGateway;
  notificationGateway: MockNotificationGateway;
  trackingGateway: MockTrackingGateway;
}
