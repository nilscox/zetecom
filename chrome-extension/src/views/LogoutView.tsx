import React, { useContext } from 'react';

import Typography from '../components/Typography';
import Form from '../components/Form';
import { ViewProps } from '../Popup';
import WormholeContext from '../contexts/WormholeContext';

const LogoutView: React.FC<ViewProps> = ({ user }) => {
  const wormhole = useContext(WormholeContext);

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
