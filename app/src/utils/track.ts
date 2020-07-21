import ReactGA from './google-analytics';

export type AuthenticateFrom = 'app' | 'popup';

export const trackViewIntegration = (identifier: string) => {
  ReactGA.event({
    category: 'Integration',
    action: 'ViewIntegration',
    label: 'View integration ' + identifier,
  });
};

export const trackSignup = (from: AuthenticateFrom) => {
  ReactGA.event({
    category: 'Authentication',
    action: 'Signup',
    label: 'Signup from ' + from,
  });
};

export const trackLogin = (from: AuthenticateFrom) => {
  ReactGA.event({
    category: 'Authentication',
    action: 'Login',
    label: 'Login from ' + from,
  });
};

export const trackLoginFailed = (from: AuthenticateFrom) => {
  ReactGA.event({
    category: 'Authentication',
    action: 'LoginFailed',
    label: 'Login failed from ' + from,
  });
};

export const trackLogout = (from: AuthenticateFrom) => {
  ReactGA.event({
    category: 'Authentication',
    action: 'Logout',
    label: 'Logout from ' + from,
  });
};

export const trackEmailValidated = () => {
  ReactGA.event({
    category: 'Authentication',
    action: 'EmailValidated',
  });
};

export const trackAskEmailLogin = () => {
  ReactGA.event({
    category: 'Authentication',
    action: 'AskEmailLogin',
  });
};

export const trackChangePassword = () => {
  ReactGA.event({
    category: 'Authentication',
    action: 'ChangePassword',
  });
};

export const trackEmailLogin = () => {
  ReactGA.event({
    category: 'Authentication',
    action: 'EmailLogin',
  });
};

export const trackCreateComment = () => {
  ReactGA.event({
    category: 'Comment',
    action: 'Create',
  });
};

export const trackEditComment = () => {
  ReactGA.event({
    category: 'Comment',
    action: 'Edit',
  });
};

export const trackSetReaction = () => {
  ReactGA.event({
    category: 'Comment',
    action: 'SetReaction',
  });
};

export const trackSubscribeComment = () => {
  ReactGA.event({
    category: 'Comment',
    action: 'Subscribe',
  });
};

export const trackReportComment = () => {
  ReactGA.event({
    category: 'Comment',
    action: 'Report',
  });
};
