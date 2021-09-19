import { Demo } from '~/demos';

import { Nested } from './Nested';

export const nested: Demo = {
  render: () => <Nested>Some nested content</Nested>,
};
