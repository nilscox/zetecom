import { EnvironmentVariable, getEnv } from '~/utils/env';

export const useEnvironment = (variable: EnvironmentVariable) => {
  return getEnv(variable) as string;
};
