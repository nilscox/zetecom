import { Demo } from '~/demos';

import { Text } from './Text';

export const defaultText: Demo = {
  description: 'Default text',
  render: () => <Text>Some text</Text>,
};

export const small: Demo = {
  description: 'Small text',
  render: () => <Text fontSize={0}>Some text</Text>,
};

export const bold: Demo = {
  description: 'Bold text',
  render: () => <Text fontWeight="bold">Some text</Text>,
};
