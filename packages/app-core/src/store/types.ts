/* eslint-disable import/no-internal-modules */

import {
  CommentGateway,
  CommentsAreaGateway,
  DateGateway,
  ExtensionGateway,
  RouterGateway,
  TimerGateway,
  UserGateway,
} from '../gateways';
import { NotificationGateway } from '../gateways/NotificationGateway';
import { AuthenticationActions } from '../modules/authentication/actions';
import { CommentActions } from '../modules/comment/actions';
import { CommentsAreaActions } from '../modules/commentsArea/actions';
import { ExtensionActions } from '../modules/extension/actions';
import { NotificationsActions } from '../modules/notifications/actions';

import { AppState } from './AppState';
import { NormalizeActions } from './normalize';
import * as storeApi from './storeApi';

export type Dependencies = {
  commentsAreaGateway: CommentsAreaGateway;
  commentGateway: CommentGateway;
  userGateway: UserGateway;
  routerGateway: RouterGateway;
  extensionGateway: ExtensionGateway;
  dateGateway: DateGateway;
  timerGateway: TimerGateway;
  notificationGateway: NotificationGateway;
};

export type Selector<R, A extends unknown[]> = (state: AppState, ...args: A) => R;

export type AppAction =
  | NormalizeActions
  | AuthenticationActions
  | CommentActions
  | CommentsAreaActions
  | NotificationsActions
  | ExtensionActions;

export type Store = storeApi.Store<AppState, AppAction, Dependencies>;

export type GetState = Store['getState'];
export type Dispatch = Store['dispatch'];

export type ThunkAction<Return> = storeApi.ThunkAction<Return, AppState, AppAction, Dependencies>;

export type Reducer<State> = (state: State, action: AppAction) => State;
