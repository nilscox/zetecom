import React from 'react';

import Icon from 'src/components/elements/Icon/Icon';
import IconButton from 'src/components/elements/IconButton/IconButton';
import { Close } from 'src/components/icons';

type MarkAsSeenProps = {
  onClick: () => void;
};

const MarkAsSeen: React.FC<MarkAsSeenProps> = ({ onClick }) => (
  <div>
    <IconButton onClick={onClick}>
      <Icon as={Close} />
    </IconButton>
  </div>
);

export default MarkAsSeen;
