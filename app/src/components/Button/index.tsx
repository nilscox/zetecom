import React from 'react';

import Loader from 'src/components/Loader';

import { Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export type ButtonProps = MuiButtonProps & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton disabled={loading || props.disabled} {...props}>

      { children }

      { loading && (
        <Loader
          size="small"
          className={classes.loader}
        />
      ) }

    </MuiButton>
  );
};

export default Button;
