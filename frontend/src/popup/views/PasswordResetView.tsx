import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Typography from '../components/Typography';

const PasswordResetView: React.FC<RouteComponentProps> = () => (
  <div style={{ padding: '0 40px' }}>
    <Typography textAlign="center">PasswordReset</Typography>
  </div>
);

export default PasswordResetView;
