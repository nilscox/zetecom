import React from 'react';

import ViewHeader from './components/ViewHeader';
import Typography from './components/Typography';
import LoginView from './views/LoginView';

const Popup: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ViewHeader active="login" />
      <div style={{ padding: '0 40px' }}>
        <Typography variant="title">CDV</Typography>
        <LoginView />
      </div>
    </div>
  );
};

export default Popup;
