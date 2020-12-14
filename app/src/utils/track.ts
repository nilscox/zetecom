import { CommentsArea } from 'src/types/CommentsArea';

import { ReactionType } from '../types/Comment';

export type From = 'App' | 'Popup' | 'Integration';

// track app crash

const track = {
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

  emailLogin: () => ({
    category: 'Authentication',
    action: 'Email Login',
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
    name: `Set Reaction "${type}"`,
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

  viewIntegration: (identifier: string, commentsArea?: CommentsArea) => {
    if (commentsArea) {
      return {
        category: 'Extension',
        action: 'View Integration',
        name: `View Integration "${identifier}"`,
      };
    } else {
      return {
        category: 'Extension',
        action: 'View Integration',
        name: 'View Integration Closed',
      };
    }
  },
};

export default track;
