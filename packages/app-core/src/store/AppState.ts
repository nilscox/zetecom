import { ExtensionConfig, IntegrationState, SortType, UserRole } from '../entities';

import { NormalizedEntities } from './normalize';

export type AppState = {
  entities: NormalizedEntities;

  commentsAreas: {
    byIdentifier: Record<string, string>;
    commentsAreasIds: string[];
    commentsAreasCount: number;
    isFetchingCommentsAreas: boolean;
  };

  commentsArea: {
    currentCommentsAreaId?: string;
    isFetchingCommentsArea: boolean;
    notFound: boolean;
    isRequesting: boolean;
    requested: boolean;
    isFetchingComments: boolean;
    isSubmittingRootComment: boolean;
    commentsPage: number;
    commentsPageSize: number;
    commentsSort: SortType;
    commentsSearchQuery?: string;
  };

  comment: {
    isFetchingComment: boolean;
    isReportingComment: boolean;
    isCommentReported: boolean;
  };

  authenticationForm: {
    isSubmitting: boolean;
    values: {
      email: string;
      password: string;
      nick: string;
    };
    globalError?: string;
    fieldErrors: {
      email?: string;
      password?: string;
      nick?: string;
    };
  };

  extension: {
    integrationState?: IntegrationState;
    config?: ExtensionConfig;
    passwordFieldVisible: boolean;
  };

  authenticatedUser: {
    isFetchingAuthenticatedUser: boolean;
    isChangingPassword: boolean;
    user?: {
      id: string;
      email: string;
      signupDate: Date;
      role: UserRole;
    };
  };

  notifications: {
    notificationsIds: string[];
    isFetchingNotifications: boolean;
    totalNotifications: number;
    totalUnseenNotifications: number;
    pollIntervalId?: number;
  };
};
