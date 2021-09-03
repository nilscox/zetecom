import { SortType } from '../entities/SortType';
import { CommentGateway } from '../gateways/CommentGateway';
import { RouterGateway } from '../gateways/RouterGateway';
import { TimerGateway } from '../gateways/TimerGateway';
import { CommentActions } from '../modules/comment/commentActions';
import { CommentsAreaActions } from '../modules/commentsArea/commentsAreaActions';
import { UserActions } from '../modules/user/userActions';

import { NormalizeActions, NormalizedEntities } from './normalize';
import * as storeApi from './storeApi';

export type AppState = {
  entities: NormalizedEntities;
  commentsArea: {
    currentCommentsAreaId?: string;
    isFetchingCommentsArea: boolean;
    isFetchingComments: boolean;
    isSubmittingRootComment: boolean;
    commentsPage: number;
    commentsPageSize: number;
    commentsSort: SortType;
    commentsSearchQuery?: string;
  };
  userId?: string;
};

export type Dependencies = {
  commentGateway: CommentGateway;
  routerGateway: RouterGateway;
  timerGateway: TimerGateway;
};

export type AppAction = NormalizeActions | CommentActions | CommentsAreaActions | UserActions;

export type Store = storeApi.Store<AppState, AppAction, Dependencies>;

export type GetState = Store['getState'];
export type Dispatch = Store['dispatch'];

export type ThunkAction<Return> = storeApi.ThunkAction<Return, AppState, AppAction, Dependencies>;

export type Reducer<State> = (state: State, action: AppAction) => State;
