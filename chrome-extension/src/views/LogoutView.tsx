import React, { useContext } from 'react';

import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import UserContext from '../contexts/userContext';

const LogoutView: React.FC = () => {
  const wormhole = useContext(WormholeContext);
  const user = useContext(UserContext);

  const logoutSubmit = () => {
    if (!wormhole) return;

    wormhole.postEvent({
      type: 'LOGOUT'
    });
  };

  return (
    <>
      <Typography>
        <>Vous êtes connecté en tant que {user && user.nick}.</>
      </Typography>
      <Form
        fields={{}}
        submitButtonValue="Déconnexion"
        onSubmit={logoutSubmit}
      />
    </>
  );
};

export default LogoutView;
