import { CommentsArea } from 'src/types/CommentsArea';

import { ReactionType } from '../types/Comment';

export type From = 'App' | 'Popup' | 'Integration';

const track = {
  signup: (from: From) => ({
    category: 'Authentication',
    action: 'Signup',
    name: 'Signup From ' + from,
  }),

  login: (from: From) => ({
    category: 'Authentication',
    action: 'Login',
    name: 'Login From ' + from,
  }),

  loginFailed: (from: From) => ({
    category: 'Authentication',
    action: 'Login Failed',
    name: 'Login Failed From ' + from,
  }),

  logout: (from: From) => ({
    category: 'Authentication',
    action: 'Logout',
    name: 'Logout From ' + from,
  }),

  emailValidated: () => ({
    category: 'Authentication',
    action: 'Email Validated',
  }),

  askEmailLogin: (from: From) => ({
    category: 'Authentication',
    action: 'Ask Email Login',
    name: 'Ask Email Login From ' + from,
  }),

  changePassword: () => ({
    category: 'Authentication',
    action: 'Change Password',
  }),

  linkLogin: () => ({
    category: 'Authentication',
    action: 'Link Login',
  }),

  commentCreated: () => ({
    category: 'Comment',
    action: 'Create',
  }),

  commentEdited: () => ({
    category: 'Comment',
    action: 'Edit',
  }),

  setReaction: (type: ReactionType | null) => ({
    category: 'Comment',
    action: 'Set Reaction',
    name: `Set Reaction "${type ?? 'null'}"`,
  }),

  subscribeComment: () => ({
    category: 'Comment',
    action: 'Subscribe',
  }),

  unsubscribeComment: () => ({
    category: 'Comment',
    action: 'Unsubscribe',
  }),

  reportComment: () => ({
    category: 'Comment',
    action: 'Report',
  }),

  commentsAreaRequested: (from: From) => ({
    category: 'CommentsArea',
    action: 'Request',
    name: `Request Comments Area From ${from}`,
  }),

  commentsAreaRequestRejected: () => ({
    category: 'CommentsArea',
    action: 'Request Rejected',
  }),

  createCommentsArea: () => ({
    category: 'CommentsArea',
    action: 'Create',
  }),

  notificationSeen: (notificationType: string) => ({
    category: 'Notification',
    action: 'Seen',
    name: `Notification Seen "${notificationType}"`,
  }),

  viewIntegration: (identifier: string, commentsArea?: CommentsArea) => {
    if (commentsArea) {
      return {
        category: 'Extension',
        action: 'View Integration',
        name: `View Integration "${identifier}"`,
      };
    }
  },
};

export default track;
