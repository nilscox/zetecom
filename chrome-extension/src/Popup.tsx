import React from 'react';

import LoginView from './views/LoginView';

const Popup: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <LoginView />
      </div>
    </div>
  );
}

export default Popup;
