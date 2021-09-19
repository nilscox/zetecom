const environmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  DEMO: process.env.DEMO,
  BASENAME: process.env.BASENAME,
  API_URL: process.env.API_URL,
  WEBSITE_URL: process.env.WEBSITE_URL,
};

export type EnvironmentVariable = keyof typeof environmentVariables;

export const getEnv = (variable: EnvironmentVariable) => {
  return environmentVariables[variable];
};
