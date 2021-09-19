import { cleanup } from '@testing-library/react';

import 'earl-plugin-dom';

process.env.TZ = 'UTC';

before(() => {
  process.stdout.write('\x1Bc');
});

afterEach(cleanup);
