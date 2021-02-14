import React from 'react';

import clsx from 'clsx';

import Icon from 'src/components-v2/elements/Icon/Icon';
import IconButton from 'src/components-v2/elements/IconButton/IconButton';
import { Notification, NotificationActive } from 'src/components-v2/icons';

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
    <IconButton className={clsx(className, isSubscribed && 'active')} onClick={onClick} data-testid="subscribe-button">
      <Icon
        className={isSubscribed ? 'active' : undefined}
        size="small"
        as={isSubscribed ? NotificationActive : Notification}
        color={isSubscribed ? 'primary' : 'icon'}
      />
    </IconButton>
  );
};

export default SubscribeButton;
