import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import UserContext from '../contexts/userContext';

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const wormhole = useContext(WormholeContext);
  const user = useContext(UserContext);

  const logoutSubmit = () => {
    if (!wormhole)
      return;

    wormhole.onEvent('LOGOUT_SUCCESS', () => history.push('/login'));

    wormhole.postEvent({
      type: 'LOGOUT',
    });
  };

  return (
    <>
      <div style={{ padding: '0 40px' }}>
        <Typography>
          <>Vous êtes connecté en tant que {user && user.nick}.</>
        </Typography>
        <Form
          fields={{}}
          submitButtonValue="Déconnexion"
          onSubmit={logoutSubmit}
        />
      </div>
    </>
  );
};

export default LogoutView;
