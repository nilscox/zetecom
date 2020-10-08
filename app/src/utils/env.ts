const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  WEBSITE_URL: process.env.WEBSITE_URL,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: process.env.SENTRY_DNS,
  CYPRESS: process.env.CYPRESS,
  DEBUG: process.env.DEBUG,
};

export type EnvironmentVariable = keyof typeof env;

export default env;
