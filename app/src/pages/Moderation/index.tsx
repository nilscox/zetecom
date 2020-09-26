import React from 'react';

import { Typography } from '@material-ui/core';

import Authenticated from 'src/components/Authenticated';

import OpenCommentsAreaRequests from './OpenCommentsAreaRequests';
import ReportedComments from './ReportedComments';

const Moderation: React.FC = () => {

  return (
    <Authenticated>
      <Typography variant="h1" style={{ margin: '16px 0 32px 0' }}>
        Espace modération
      </Typography>
      <OpenCommentsAreaRequests />
      <ReportedComments />
    </Authenticated>
  );
};

export default Moderation;
