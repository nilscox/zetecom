import pkg from '../../package.json';

import env from './env';

type Zetecom = {
  appVersion: string;
  env: Record<string, string | undefined>;
  tracking?: {
    pageViews: unknown[];
    events: unknown[];
  };
};

declare global {
  interface Window {
    zetecom: Zetecom;
  }
}

window.zetecom = {
  appVersion: pkg.version,
  env,
};
