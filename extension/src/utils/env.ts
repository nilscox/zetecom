const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  BASE_URL: process.env.BASE_URL,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
};

export type EnvironmentVariable = keyof typeof env;

export default env;