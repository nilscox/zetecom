import { AppState } from '../../AppState';
import { Reducer } from '../../types';

import { commentsAreasEntitiesReducer } from './commentsAreasEntitiesReducer';
import { commentsEntitiesReducer } from './commentsEntitiesReducer';
import { informationsEntitiesReducer } from './informationsEntitiesReducer';
import { notificationsEntitiesReducer } from './notificationsEntitiesReducer';
import { usersEntitiesReducer } from './usersEntitiesReducer';

export const entitiesReducer: Reducer<AppState['entities']> = (state, action) => ({
  users: usersEntitiesReducer(state.users, action),
  notifications: notificationsEntitiesReducer(state.notifications, action),
  informations: informationsEntitiesReducer(state.informations, action),
  commentsAreas: commentsAreasEntitiesReducer(state.commentsAreas, action),
  comments: commentsEntitiesReducer(state.comments, action),
});
