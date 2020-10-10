import pkg from '../../package.json';

import env from './env';
import { GAEvent } from './google-analytics';

type Zetecom = {
  appVersion: string;
  env: Record<string, string | undefined>,
  mockGa?: {
    initialized: boolean;
    events: GAEvent[];
    pageviews: string[];
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
