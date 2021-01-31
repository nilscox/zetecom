import React, { HTMLProps } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({ spacing, palette }) => ({
  select: {
    padding: spacing(0.5, 1),
    fontFamily: 'monospace',
    border: `1px solid ${palette.grey[400]}`,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
}));

type SelectProps = HTMLProps<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ ...props }) => {
  const classes = useStyles();

  return <select className={clsx(classes.select, props.className)} {...props} />;
};

export default Select;
