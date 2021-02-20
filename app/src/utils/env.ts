const env = {
  NODE_ENV: process.env.NODE_ENV ?? '',
  API_URL: process.env.API_URL ?? '',
  WEBSITE_URL: process.env.WEBSITE_URL ?? '',
  ANALYTICS_URL: process.env.ANALYTICS_URL ?? '',
  ANALYTICS_SITE_ID: process.env.ANALYTICS_SITE_ID ?? '',
  SENTRY_DSN: process.env.SENTRY_DSN ?? '',
  DEBUG: process.env.DEBUG ?? '',
};

export type EnvironmentVariable = keyof typeof env;

export default env;
