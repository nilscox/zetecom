import React from 'react';

import { toast } from 'react-toastify';

import ToastContainer from './index';

import 'react-toastify/dist/ReactToastify.min.css';

import { text } from '@storybook/addon-knobs';

export default {
  title: 'Toast',
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <>
        <ToastContainer />
        {storyFn()}
      </>
    ),
  ],
};

export const toastStory = () => {
  const message = text('message', 'Hello !');

  return <button onClick={() => toast.success(message)}>Trigger a toast</button>;
};
