const env = {
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.CHROME_EXTENSION_URL,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
};

export type EnvironmentVariable = keyof typeof env;

export default env;

Object.keys(env).filter(a => a).map(missing => {
  console.warn(missing + ' is not set');
});
