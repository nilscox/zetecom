import React, { useContext, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import UserContext from '../contexts/userContext';

const { PRODUCTION_URL } = process.env;

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const wormhole = useContext(WormholeContext);
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const logoutSubmit = () => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('LOGOUT_SUCCESS', () => history.push('/login'));
    wormhole.onEvent('LOGOUT_FAILURE', () => {
      setLoading(false);
      setError(true);
    });

    wormhole.postEvent({
      type: 'LOGOUT',
    });
  };

  if (!user)
    return <Redirect to="/" />;

  return (
    <>
      <div style={{ padding: '0 40px' }}>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '10px 0',
            paddingBottom: 5,
            borderBottom: '1px solid #CCC',
          }}
        >
          <img
            style={{ width: 32, height: 32, borderRadius: 16, border: '1px solid #CCC' }}
            src={user.avatar || `${PRODUCTION_URL}/assets/images/default-avatar.png`}
          />
          <Typography style={{ marginLeft: 10, fontWeight: 'bold' }}>{ user.nick }</Typography>
        </div>

        <Typography style={{ margin: '15px 0' }}>
          <>Email: { user.email }</>
        </Typography>

        <Typography style={{ margin: '15px 0' }}>
          <>Inscrit(e) depuis le: { moment(user.created).format('DD MM YYYY') }</>
        </Typography>

        <Typography>
          <>
            Vous êtes connecté(e) sur <a href="#">CDV</a> en tant que <em>{ user.nick }</em>.
            La charte est accessible <a href="#">ici</a>.
          </>
        </Typography>

        <Form
          fields={{}}
          submitButtonValue="Déconnexion"
          isLoading={loading}
          globalErrorMessage={error ? 'Une erreur s\'est produite... :/' : undefined}
          onSubmit={logoutSubmit}
        />

      </div>
    </>
  );
};

export default LogoutView;
