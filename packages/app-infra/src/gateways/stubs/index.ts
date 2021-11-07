import { Dependencies } from '@zetecom/app-core';

import { RealTimerGateway } from '../RealTimerGateway';

import { EntitiesContainers } from './EntitiesContainers';
import { StubCommentGateway } from './StubCommentGateway';
import { StubCommentsAreaGateway } from './StubCommentsAreaGateway';
import { StubDateGateway } from './StubDateGateway';
import { StubExtensionGateway } from './StubExtensionGateway';
import { StubNotificationGateway } from './StubNotificationGateway';
import { StubRouterGateway } from './StubRouterGateway';
import { StubTrackingGateway } from './StubTrackingGateway';
import { StubUserGateway } from './StubUserGateway';

export { EntitiesContainers } from './EntitiesContainers';

export interface StubDependencies extends Dependencies {
  commentsAreaGateway: StubCommentsAreaGateway;
  commentGateway: StubCommentGateway;
  userGateway: StubUserGateway;
  dateGateway: StubDateGateway;
  extensionGateway: StubExtensionGateway;
  routerGateway: StubRouterGateway;
  timerGateway: RealTimerGateway;
  notificationGateway: StubNotificationGateway;
}

export const stubDependencies = (containers: EntitiesContainers): StubDependencies => ({
  commentsAreaGateway: new StubCommentsAreaGateway(containers.commentsAreas, containers.comments),
  commentGateway: new StubCommentGateway(containers.comments),
  userGateway: new StubUserGateway(),
  routerGateway: new StubRouterGateway(),
  extensionGateway: new StubExtensionGateway(),
  dateGateway: new StubDateGateway(),
  timerGateway: new RealTimerGateway(),
  notificationGateway: new StubNotificationGateway(),
  trackingGateway: new StubTrackingGateway(),
});
