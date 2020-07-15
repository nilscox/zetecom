import { AxiosStatic } from 'axios';

import { GAEvent } from './google-analytics';

type Zetecom = {
  appVersion: string;
  axios: AxiosStatic;
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

const zetecom: Zetecom = window.zetecom = {} as Zetecom;

export default zetecom;
