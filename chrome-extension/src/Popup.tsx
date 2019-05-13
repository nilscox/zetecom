import React, { useState, useEffect, useContext } from 'react';

import ViewHeader from './components/ViewHeader';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import SignupView from './views/SignupView';
import PasswordResetView from './views/PasswordResetView';
import Wormhole from './types/Wormhole';
import WormholeContext from './contexts/WormholeContext';
import { Loader } from './components/Loader';
import User from './types/User';
import { FetchMeSuccess } from './types/Wormhole';

export type ViewType = 'login' | 'logout' | 'signup' | 'passwordreset';

export type ViewProps = {
  user?: User;
  onChangeView: (view: ViewType) => void;
};

const Popup: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('login');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const wormhole = useContext<Wormhole | null>(WormholeContext);

  const isActiveView = (view: React.ElementType): boolean => {
    if (view === LoginView)
      return activeView === 'login';
    else if (view === LogoutView)
      return activeView === 'logout';
    else if (view === SignupView)
      return activeView === 'signup';
    else if (view === PasswordResetView)
      return activeView === 'passwordreset';
    else
      return false;
  };

  useEffect(() => {
    if (!wormhole)
      return;

    wormhole.onEvent('FETCH_ME_SUCCESS', (event: FetchMeSuccess) => {
      setLoading(false);
      setActiveView('logout');
      setUser(event.user);
    });
    wormhole.onEvent('FETCH_ME_FAILURE', () => setLoading(false));
    wormhole.onEvent('LOGIN_SUCCESS', () => setActiveView('logout'));
    wormhole.onEvent('LOGOUT_SUCCESS', () => setActiveView('login'));

    wormhole.postEvent({ type: 'FETCH_ME' });
  }, [wormhole]);

  if (loading) return <Loader size="big" />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ViewHeader active={activeView} onChangeView={setActiveView} />
      <div style={{ position: 'relative', margin: '0 40px' }}>
        {[LoginView, LogoutView, SignupView, PasswordResetView].map(
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
              {<View user={user} onChangeView={setActiveView} />}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Popup;
