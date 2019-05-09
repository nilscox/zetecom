import React, { useState } from 'react';

import ViewHeader from './components/ViewHeader';
import Typography from './components/Typography';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import PasswordResetView from './views/PasswordResetView';

const Popup: React.FC = () => {
  const [activeView, setActiveView] = useState<
    'login' | 'signup' | 'passwordreset'
  >('login');

  const isActiveView = (view: React.ElementType): boolean => {
    if (view === LoginView) return activeView === 'login';
    else if (view === SignupView) return activeView === 'signup';
    else if (view === PasswordResetView) return activeView === 'passwordreset';
    else return false;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ViewHeader active={activeView} onChangeView={setActiveView} />
      <div style={{ padding: '0 40px' }}>
        <Typography variant="title">CDV</Typography>
        <div style={{ position: 'relative' }}>
          {[LoginView, SignupView, PasswordResetView].map((View, n) => (
            <div
              key={n}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transition: 'opacity 200ms',
                opacity: isActiveView(View) ? 1 : 0
              }}
            >
              {<View />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
