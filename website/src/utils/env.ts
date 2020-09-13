import { createContext, useContext } from 'react';

const EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  FIREFOX_ADDON_URL: process.env.FIREFOX_ADDON_URL,
  CHROME_EXTENSION_STAGING_URL: process.env.CHROME_EXTENSION_STAGING_URL,
  FIREFOX_ADDON_STAGING_URL: process.env.FIREFOX_ADDON_STAGING_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  FACEBOOK_PAGE: process.env.FACEBOOK_PAGE,
  TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
};

const EnvironmentContext = createContext(EnvironmentVariables);
export const useEnvironment = (env: keyof typeof EnvironmentVariables) => useContext(EnvironmentContext)[env];
