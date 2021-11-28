import { cleanup } from '@testing-library/react';

import './zetecom-global';

import 'earl-plugin-dom';

process.env.TZ = 'UTC';

before(() => {
  process.stdout.write('\x1Bc');
});

afterEach(cleanup);
