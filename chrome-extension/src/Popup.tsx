import React, { useState } from 'react';

import ViewHeader from './components/ViewHeader';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import PasswordResetView from './views/PasswordResetView';

export type ViewType = 'login' | 'signup' | 'passwordreset';

export type ViewProps = {
  onChangeView: (view: ViewType) => void;
};

const Popup: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('login');

  const isActiveView = (view: React.ElementType): boolean => {
    if (view === LoginView) return activeView === 'login';
    else if (view === SignupView) return activeView === 'signup';
    else if (view === PasswordResetView) return activeView === 'passwordreset';
    else return false;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ViewHeader active={activeView} onChangeView={setActiveView} />
      <div style={{ position: 'relative', margin: '0 40px' }}>
        {[LoginView, SignupView, PasswordResetView].map(
          (View: React.FC<ViewProps>, n) => (
            <div
              key={n}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transition: 'opacity 200ms',
                opacity: isActiveView(View) ? 1 : 0,
                zIndex: isActiveView(View) ? 1 : 0
              }}
            >
              {<View onChangeView={setActiveView} />}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Popup;
