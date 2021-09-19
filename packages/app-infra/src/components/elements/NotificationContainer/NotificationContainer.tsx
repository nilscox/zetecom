/* @jsx jsx */

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from '@emotion/react';
import { darken, lighten } from 'polished';
import { ToastContainer, Zoom } from 'react-toastify';

import { Theme } from '~/theme';

import 'react-toastify/dist/ReactToastify.css';

const types = ['success', 'warning', 'error', 'info'] as const;

export const NotificationContainer: React.FC = () => (
  <ToastContainer
    hideProgressBar
    icon={false}
    closeOnClick
    draggable
    pauseOnHover
    transition={Zoom}
    position="top-right"
    autoClose={8000}
    css={(theme: Theme) =>
      types.reduce(
        (obj, type) => ({
          ...obj,
          [`.Toastify__toast--${type}`]: {
            background: lighten(0.3, theme.colors[type]),
            color: darken(0.3, theme.colors[type]),
            borderBottom: `4px solid ${theme.colors[type]}`,
            '.Toastify__close-button': {
              color: theme.colors.secondary,
            },
          },
        }),
        {},
      )
    }
  />
);
