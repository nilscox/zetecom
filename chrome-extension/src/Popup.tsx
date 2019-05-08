import React from 'react';

import ViewHeader from './components/ViewHeader';
import Typography from './components/Typography';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';

const Popup: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ViewHeader active="signup" />
      <div style={{ padding: '0 40px' }}>
        <Typography variant="title">CDV</Typography>
        {/* <LoginView /> */}
        <SignupView />
      </div>
    </div>
  );
};

export default Popup;
