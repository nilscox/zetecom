const env = {
  NODE_ENV: import.meta.env.NODE_ENV,
  API_URL: import.meta.env.SNOWPACK_PUBLIC_API_URL,
  WEBSITE_URL: import.meta.env.SNOWPACK_PUBLIC_WEBSITE_URL,
  ANALYTICS_URL: import.meta.env.SNOWPACK_PUBLIC_ANALYTICS_URL,
  ANALYTICS_SITE_ID: import.meta.env.SNOWPACK_PUBLIC_ANALYTICS_SITE_ID,
  SENTRY_DSN: import.meta.env.SNOWPACK_PUBLIC_SENTRY_DSN,
  DEBUG: import.meta.env.SNOWPACK_PUBLIC_DEBUG,
};

export type EnvironmentVariable = keyof typeof env;

export default env;
