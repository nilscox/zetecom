import React from 'react';

import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import { ViewProps } from '../Popup';

const PasswordResetView: React.FC<ViewProps> = () => (
  <>
    <ViewHeader />
    <Typography>PasswordReset</Typography>
  </>
);

export default PasswordResetView;
