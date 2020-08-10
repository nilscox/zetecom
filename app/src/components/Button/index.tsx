import React from 'react';

import { Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles } from '@material-ui/core';

import Loader from 'src/components/Loader';

const useStyles = makeStyles(({ palette }) => ({
  buttonFocus: {
    color: palette.primary.main,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export type ButtonProps = MuiButtonProps & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  disableFocusRipple = true,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      disableFocusRipple={disableFocusRipple}
      disabled={loading || props.disabled}
      classes={{
        focusVisible: classes.buttonFocus,
        ...props.classes,
      }}
      {...props}
    >

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
