const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  WEBSITE_URL: process.env.WEBSITE_URL,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
};

export type EnvironmentVariable = keyof typeof env;

export default env;
