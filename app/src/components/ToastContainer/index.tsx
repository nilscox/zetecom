import React from 'react';

import { makeStyles } from '@material-ui/core';
import { ToastContainer as ReactToastifyContainer, Zoom } from 'react-toastify';

const types = ['success', 'warning', 'error', 'info'] as const;

const useStyles = makeStyles(({ palette }) => ({
  toast: types.reduce(
    (obj, type) => ({
      ...obj,
      [`&.Toastify__toast--${type}`]: {
        background: palette[type].light,
        borderBottom: `4px solid ${palette[type].main}`,
        color: palette.secondary.dark,
        '& .Toastify__close-button': {
          color: palette.secondary.main,
        },
      },
    }),
    {},
  ),
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
