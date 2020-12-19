import * as Sentry from '@sentry/browser';

import env from './env';

if (env.SENTRY_DSN) {
  Sentry.init({ dsn: env.SENTRY_DSN });
}
