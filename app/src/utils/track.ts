import { CommentsArea } from 'src/types/CommentsArea';

import { ReactionType } from '../types/Comment';

export type AuthenticateFrom = 'App' | 'Popup';

const track = {
  login: (from: AuthenticateFrom) => ({
    category: 'Authentication',
    action: 'Login',
    name: 'Login From ' + from,
  }),

  loginFailed: (from: AuthenticateFrom) => ({
    category: 'Authentication',
    action: 'Login Failed',
    name: 'Login Failed From ' + from,
  }),

  logout: (from: AuthenticateFrom) => ({
    category: 'Authentication',
    action: 'Logout',
    name: 'Logout From ' + from,
  }),

  emailValidated: () => ({
    category: 'Authentication',
    action: 'Email Validated',
  }),

  askEmailLogin: (from: AuthenticateFrom) => ({
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
    action: 'Created',
  }),

  commentEdited: () => ({
    category: 'Comment',
    action: 'Edited',
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

  requestCommentsArea: (identifier: string, alreadyRequested = false) => ({
    category: 'CommentsArea',
    action: 'Request',
    name: `Request ${alreadyRequested ? 'Again ' : ''}"${identifier}"`,
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
