const enviornmentVariables = [

  // Env

  'NODE_ENV',
  'CI',

  'LISTEN_IP',
  'LISTEN_PORT',

  'REFLECT_ORIGIN',
  'BYPASS_AUTHORIZATIONS',
  'ADMIN_USER',

  'APP_URL',
  'WEBSITE_URL',

  // Database

  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'DB_SYNC',
  'DB_ENTITIES',
  'DB_MIGRATIONS_DIR',
  'DB_DEBUG',

  // Email

  'EMAIL_HOST',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  'EMAIL_BYPASS',
  'EMAIL_ACCOUNT_VERIFICATION',
  'EMAIL_ACCOUNT_AUTHORIZATION',

  // Secret

  'SESSION_SECRET',

  // Paths

  'EMAIL_TEMPLATE_DIR',
  'USER_AVATAR_DESTINATION',

] as const;

export type EnviornmentVariable = typeof enviornmentVariables[number];

export const env = enviornmentVariables.reduce(
  (obj, key) => ({ ...obj, [key]: process.env[key] }),
  {} as { [key in EnviornmentVariable]: string },
);
