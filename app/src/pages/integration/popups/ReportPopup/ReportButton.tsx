import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import Button, { ButtonProps } from 'src/components/Button';

type StylesProps = {
  hover: boolean;
}

const useStyles = makeStyles(({ palette }) => ({
  submitButton: ({ hover }: StylesProps) => ({
    color: hover ? palette.text.warning : undefined,
    transition: 'color 160ms ease',
  }),
}));

const ReportButton: React.FC<ButtonProps> = (props) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles({ hover });

  return (
    <Button
      size="large"
      className={classes.submitButton}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      Signaler
    </Button>
  );
};

export default ReportButton;
