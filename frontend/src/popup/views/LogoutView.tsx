import React, { useContext, useEffect } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import UserAvatar from 'src/components/common/UserAvatar';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import Form from '../components/Form';
import useAxios from 'src/hooks/use-axios';

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const { sizes: { medium, big } } = useTheme();
  const { user, setUser } = useContext(UserContext);

  const opts = { method: 'POST', url: '/api/auth/logout', withCredentials: true };
  const [{ error, loading, response }, logout] = useAxios(opts, () => undefined, { manual: true });

  useEffect(() => {
    if (response && response.status === 204) {
      setUser(null);
      history.push('/popup/login');
    }
  }, [response, setUser, history]);

  if (!user)
    return <Redirect to="/" />;

  if (error)
    throw error;

  return (
    <Box px={4 * big}>

      <Flex
        flexDirection="row"
        alignItems="center"
        my={big}
        pb={medium}
        style={{
          borderBottom: '1px solid #CCC',
        }}
      >
        <UserAvatar user={user} />
        <Box ml={big}>
          <Text bold>{ user.nick }</Text>
        </Box>
      </Flex>

      <Box my={big}>
        <Text>
          Email: { user.email }
        </Text>
      </Box>

      <Box my={big}>
        <Text>
          Inscrit(e) depuis le: { moment(user.created).format('DD MM YYYY') }
        </Text>
      </Box>

      <Box my={big}>
        <Text>
          Vous êtes connecté(e) sur <Link to="/" target="_blank">Réagir à l'information</Link> en tant que{' '}
          <em>{ user.nick }</em>. La charte est accessible <Link to="/charte" target="_blank">ici</Link>.
        </Text>
      </Box>

      <Box mt={big} style={{ alignSelf: 'center' }}>
        <Form onSubmit={logout} loading={loading} submitButtonValue="Déconnexion" />
      </Box>

    </Box>
  );
};

export default LogoutView;
