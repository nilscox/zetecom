import { Demo } from '~/demos';

import { Button } from './Button';

export const defaultButton: Demo = {
  description: 'Default button',
  render: () => <Button>Click me!</Button>,
};

export const disabled: Demo = {
  description: 'Button in a disabled state',
  render: () => <Button disabled>Don't click me!</Button>,
};

export const loading: Demo = {
  description: 'Button in a loading state',
  render: () => <Button loading>Oh wait...</Button>,
};
