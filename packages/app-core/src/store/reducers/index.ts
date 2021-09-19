import { SortType } from '../../entities';
import { AppState } from '../AppState';
import { AppAction } from '../types';

import { authenticatedUserReducer } from './authenticatedUserReducer';
import { authenticationFormReducer } from './authenticationFormReducer';
import { commentReducer } from './commentReducer';
import { commentsAreaReducer } from './commentsAreaReducer';
import { commentsAreasReducer } from './commentsAreasReducer';
import { entitiesReducer } from './entitiesReducer';
import { extensionReducer } from './extensionReducer';
import { notificationsReducer } from './notificationsReducer';

export const initialState: AppState = {
  entities: {
    users: {},
    notifications: {},
    informations: {},
    commentsAreas: {},
    comments: {},
  },

  commentsAreas: {
    byIdentifier: {},
    commentsAreasIds: [],
    commentsAreasCount: 0,
    isFetchingCommentsAreas: false,
  },

  commentsArea: {
    isSubmittingRootComment: false,
    isFetchingCommentsArea: false,
    isFetchingComments: false,
    notFound: false,
    isRequesting: false,
    requested: false,
    currentCommentsAreaId: undefined,
    commentsPage: 1,
    commentsPageSize: 10,
    commentsSort: SortType.relevance,
    commentsSearchQuery: undefined,
  },

  comment: {
    isFetchingComment: false,
    isReportingComment: false,
    isCommentReported: false,
  },

  extension: {
    integrationState: undefined,
    config: undefined,
  },

  authenticationForm: {
    isSubmitting: false,
    values: {
      email: '',
      password: '',
      nick: '',
    },
    globalError: undefined,
    fieldErrors: {
      email: undefined,
      password: undefined,
      nick: undefined,
    },
  },

  authenticatedUser: {
    isFetchingAuthenticatedUser: false,
    isChangingPassword: false,
    user: undefined,
  },

  notifications: {
    notificationsIds: [],
    isFetchingNotifications: false,
    totalNotifications: 0,
    totalUnseenNotifications: 0,
  },
};

export const rootReducer = (state: AppState = initialState, action: AppAction): AppState => ({
  entities: entitiesReducer(state.entities, action),
  commentsAreas: commentsAreasReducer(state.commentsAreas, action),
  commentsArea: commentsAreaReducer(state.commentsArea, action),
  comment: commentReducer(state.comment, action),
  extension: extensionReducer(state.extension, action),
  authenticationForm: authenticationFormReducer(state.authenticationForm, action),
  authenticatedUser: authenticatedUserReducer(state.authenticatedUser, action),
  notifications: notificationsReducer(state.notifications, action),
});
