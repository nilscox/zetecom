import React from 'react';

import { toast } from 'react-toastify';

import { Demo } from '~/demos';

import { Button } from '../Button/Button';

import { NotificationContainer } from './NotificationContainer';

export const toastContainer: Demo = {
  render: () => (
    <>
      <NotificationContainer />
      <Button onClick={() => toast.success("I'm full!")}>Success</Button>
      <Button onClick={() => toast.info('I want to eat a banana.')}>Info</Button>
      <Button onClick={() => toast.warning("There's only one banana left...")}>Warning</Button>
      <Button onClick={() => toast.error('There is no banana anymore.')}>Error</Button>
    </>
  ),
};
