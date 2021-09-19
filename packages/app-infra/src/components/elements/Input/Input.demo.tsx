import { Demo } from '~/demos';

import { Input } from './Input';

export const defaultInput: Demo = {
  description: 'Default input',
  render: () => <Input />,
};

export const fullWidthInput: Demo = {
  description: "Input taking 100% of its parent's width",
  render: () => <Input fullWidth />,
};

export const outlinedInput: Demo = {
  description: 'Input outlined',
  render: () => <Input outlined />,
};

export const disabledInput: Demo = {
  description: 'Input in a disabled state',
  render: () => <Input disabled value="this is read only" />,
};

export const inputWithError: Demo = {
  description: 'Input with an error text',
  render: () => <Input error="Le chapeau n'est pas magique" />,
};
