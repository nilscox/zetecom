import React from 'react';

import { ToastContainer as ReactToastifyContainer, Zoom } from 'react-toastify';

import { makeStyles } from '@material-ui/core';

const types = ['success', 'warning', 'error'] as const;

const useStyles = makeStyles(({ palette }) => ({
  toast: types.reduce((obj, type) => ({
    ...obj,
    [`&.Toastify__toast--${type}`]: {
      background: palette[type].light,
      border: `1px solid ${palette[type].main}`,
      color: palette.secondary.dark,
      '& .Toastify__close-button': {
        color: palette.secondary.main,
      },
    },
  }), {}),
}));

const ToastContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <ReactToastifyContainer
      hideProgressBar
      closeOnClick
      draggable
      pauseOnHover
      transition={Zoom}
      position="top-right"
      autoClose={5000}
      toastClassName={classes.toast}
    />
  );
};

export default ToastContainer;
