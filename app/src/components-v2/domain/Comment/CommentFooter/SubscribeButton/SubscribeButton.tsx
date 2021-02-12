import React from 'react';

import Icon from '../../../../elements/Icon/Icon';
import IconButton from '../../../../elements/IconButton/IconButton';
import { Notification, NotificationActive } from '../../../../icons';

type SubscribeButtonProps = {
  className?: string;
  isSubscribed: boolean;
  onClick?: () => void;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ className, isSubscribed, onClick }) => {
  if (isSubscribed === undefined) {
    return null;
  }

  return (
    <IconButton className={className} onClick={onClick}>
      <Icon
        size="small"
        as={isSubscribed ? NotificationActive : Notification}
        color={isSubscribed ? 'primary' : 'icon'}
      />
    </IconButton>
  );
};

export default SubscribeButton;
