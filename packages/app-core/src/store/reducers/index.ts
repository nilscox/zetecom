import { SortType } from '../../entities/SortType';
import { AppAction, AppState, Reducer } from '../store';

import { commentsAreaReducer } from './commentsAreaReducer';
import { commentsAreasReducer } from './commentsAreasReducer';
import { commentsReducer } from './commentsReducer';
import { informationsReducer } from './informationsReducer';
import { usersReducer } from './usersReducer';

export const initalState: AppState = {
  entities: {
    users: {},
    informations: {},
    commentsAreas: {},
    comments: {},
  },
  commentsArea: {
    isSubmittingRootComment: false,
    isFetchingCommentsArea: false,
    isFetchingComments: false,
    currentCommentsAreaId: undefined,
    commentsPage: 1,
    commentsPageSize: 10,
    commentsSort: SortType.relevance,
    commentsSearchQuery: undefined,
  },
  userId: undefined,
};

const entitiesReducer: Reducer<AppState['entities']> = (state, action) => ({
  users: usersReducer(state.users, action),
  informations: informationsReducer(state.informations, action),
  commentsAreas: commentsAreasReducer(state.commentsAreas, action),
  comments: commentsReducer(state.comments, action),
});

const userIdReducer: Reducer<AppState['userId']> = (state, action) => {
  if (action.type === 'setCurrentUser') {
    return action.payload?.id;
  }

  return state;
};

export const rootReducer = (state: AppState = initalState, action: AppAction): AppState => ({
  entities: entitiesReducer(state.entities, action),
  commentsArea: commentsAreaReducer(state.commentsArea, action),
  userId: userIdReducer(state.userId, action),
});
