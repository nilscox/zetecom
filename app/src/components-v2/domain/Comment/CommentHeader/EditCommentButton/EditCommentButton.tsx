import React from 'react';

import Icon from '../../../../elements/Icon/Icon';
import IconButton from '../../../../elements/IconButton/IconButton';
import { Edit } from '../../../../icons';

type EditCommentButtonProps = {
  className?: string;
  onClick: () => void;
};

const EditCommentButton: React.FC<EditCommentButtonProps> = ({ className, onClick }) => (
  <IconButton className={className} onClick={onClick}>
    <Icon size="small" as={Edit} />
  </IconButton>
);

export default EditCommentButton;
