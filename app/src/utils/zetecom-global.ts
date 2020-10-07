import { GAEvent } from './google-analytics';

type Zetecom = {
  appVersion: string;
  mockGa: {
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

window.zetecom = {} as Zetecom;
