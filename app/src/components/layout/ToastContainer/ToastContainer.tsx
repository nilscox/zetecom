import React from 'react';

import styled from '@emotion/styled';
import { darken } from 'polished';
import { ToastContainer as ReactToastifyContainer, Zoom } from 'react-toastify';

const types = ['success', 'warning', 'error', 'info'] as const;

const StyledToastContainer = styled(ReactToastifyContainer)(({ theme }) =>
  types.reduce(
    (obj, type) => ({
      ...obj,
      [`.Toastify__toast--${type}`]: {
        background: theme.colors[type],
        color: darken(0.6, theme.colors[type]),
        borderBottom: `4px solid ${darken(0.2, theme.colors[type])}`,
        '.Toastify__close-button': {
          color: theme.colors.secondary,
        },
      },
    }),
    {},
  ),
);

const ToastContainer: React.FC = () => (
  <StyledToastContainer
    hideProgressBar
    closeOnClick
    draggable
    pauseOnHover
    transition={Zoom}
    position="top-right"
    autoClose={8000}
  />
);

export default ToastContainer;
