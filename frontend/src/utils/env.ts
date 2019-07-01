export type EnvironmentVariable =
  | 'NODE_ENV'
  | 'API_URL'
  | 'BASE_URL'
  | 'CHROME_EXTENSION_ID';

declare global {
  interface Window {
    env: { [key in EnvironmentVariable]: string | undefined };
  }
}

export default (name: EnvironmentVariable, defaultValue?: string) => {
  if (window.env[name])
    return window.env[name];

  if (process.env[name])
    return process.env[name];

  if (defaultValue)
    return defaultValue;

  throw new Error(`missing environment variable '${name}'`);
};
