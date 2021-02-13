import React from 'react';

import Icon from 'src/components-v2/elements/Icon/Icon';
import IconButton from 'src/components-v2/elements/IconButton/IconButton';
import { Close } from 'src/components-v2/icons';

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
