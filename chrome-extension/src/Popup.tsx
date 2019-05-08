import React from 'react';

import LoginView from './views/LoginView';

const Popup: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: '10px' }}>
      <LoginView />
    </div>
  );
};

export default Popup;
