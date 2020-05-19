import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(({ breakpoints, spacing, palette: { textLight } }) => ({
  button: {
    color: textLight.main,
  },
  sizeSmall: {
    marginLeft: spacing(2),
    fontSize: spacing(4),
    color: textLight.light,
    '& svg': {
      fontSize: 'inherit',
    },
    [breakpoints.down('xs')]: {
      fontSize: spacing(3),
    },
  },
}));

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <IconButton
      title="Éditer votre message"
      onClick={onClick}
      size="small"
      className={classes.button}
      classes={{ sizeSmall: classes.sizeSmall }}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
