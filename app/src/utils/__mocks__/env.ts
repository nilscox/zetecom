// ts-jest does not yet fully support esmodule, and fails using import.meta

const env: Record<string, string> = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.SNOWPACK_PUBLIC_API_URL,
  WEBSITE_URL: process.env.SNOWPACK_PUBLIC_WEBSITE_URL,
  ANALYTICS_URL: process.env.SNOWPACK_PUBLIC_ANALYTICS_URL,
  ANALYTICS_SITE_ID: process.env.SNOWPACK_PUBLIC_ANALYTICS_SITE_ID,
  SENTRY_DSN: process.env.SNOWPACK_PUBLIC_SENTRY_DSN,
  DEBUG: process.env.SNOWPACK_PUBLIC_DEBUG,
};

export type EnvironmentVariable = keyof typeof env;

export default env;
