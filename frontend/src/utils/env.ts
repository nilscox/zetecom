const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  BASE_URL: process.env.BASE_URL,
  CHROME_EXTENSION_ID: process.env.CHROME_EXTENSION_ID,
};

export type EnvironmentVariable = keyof typeof env;

declare global {
  interface Window {
    env: Partial<{ [key in EnvironmentVariable]: string | undefined }>;
  }
}

Object.assign(env, window.env || {});

export default env;
