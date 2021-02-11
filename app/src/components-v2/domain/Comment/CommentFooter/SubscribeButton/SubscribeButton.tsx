import React from 'react';

import Icon from '../../../../elements/Icon/Icon';
import IconButton from '../../../../elements/IconButton/IconButton';
import { Notification, NotificationActive } from '../../../../icons';

type SubscribeButtonProps = {
  className?: string;
  active: boolean;
  onClick: () => void;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ className, active, onClick }) => (
  <IconButton className={className} onClick={onClick}>
    <Icon as={active ? NotificationActive : Notification} color={active ? 'primary' : 'icon'} />
  </IconButton>
);

export default SubscribeButton;
