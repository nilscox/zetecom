import React from 'react';

import Button from './index';

export default { title: 'Button' };

export const button = () => (
  <Button>Click me</Button>
);

export const loading = () => (
  <Button loading>Click me</Button>
);
