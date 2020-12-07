import React, { createContext, useContext, ComponentType } from 'react';

const environmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  FIREFOX_ADDON_URL: process.env.FIREFOX_ADDON_URL,
  CHROME_EXTENSION_STAGING_URL: process.env.CHROME_EXTENSION_STAGING_URL,
  FIREFOX_ADDON_STAGING_URL: process.env.FIREFOX_ADDON_STAGING_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
  ANALYTICS_URL: process.env.ANALYTICS_URL,
  ANALYTICS_SITE_ID: process.env.ANALYTICS_SITE_ID,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  DISCORD_ID: process.env.DISCORD_ID,
  FACEBOOK_PAGE: process.env.FACEBOOK_PAGE,
  TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
};

export type EnvironmentVariable = keyof typeof environmentVariables;

const EnvironmentContext = createContext(environmentVariables);

export const useEnvironment = (env: EnvironmentVariable) => {
  return useContext(EnvironmentContext)[env];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withEnv = <P extends any>(Component: ComponentType<P & typeof environmentVariables>) => {
  const ComponentWithEnv: React.FC<P> = (props) => <Component {...props} {...environmentVariables} />;
  return ComponentWithEnv;
};
