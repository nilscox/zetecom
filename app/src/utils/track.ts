import ReactGA from 'react-ga';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export type AuthenticateFrom = 'app' | 'popup';

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

export const trackLogout = (from: AuthenticateFrom) => {
  ReactGA.event({
    category: 'Authentication',
    action: 'Logout',
    label: 'Logout from ' + from,
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
    action: 'change-password',
  });
};

export const trackEmailLogin = () => {
  ReactGA.event({
    category: 'Authentication',
    action: 'email-login',
  });
};
