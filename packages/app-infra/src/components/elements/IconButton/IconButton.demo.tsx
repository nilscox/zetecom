import Notification from '~/components/icons/Notification.svg';

import { Demo } from '~/demos';

import { IconButton } from './IconButton';

export const iconButton: Demo = {
  render: () => <IconButton as={Notification} />,
};
