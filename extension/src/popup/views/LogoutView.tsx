import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { useTheme } from 'src/utils/Theme';
import UserAvatar from 'src/components/common/UserAvatar';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import Form from '../components/Form';
import WebsiteLink from '../components/WebsiteLink';
import useAxios from 'src/hooks/use-axios';
import useUser from 'src/hooks/use-user';

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const { sizes: { medium, big } } = useTheme();
  const [user, setUser] = useUser();

  const opts = { method: 'POST', url: '/api/auth/logout', withCredentials: true };
  const [{ error, loading, status }, logout] = useAxios(opts, () => undefined, { manual: true });

  if (error)
    throw error;

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      history.push('/popup/login');
    }
  }, [status, setUser, history]);

  if (!user)
    return <Redirect to="/popup/login" />;

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
          Vous êtes connecté(e) sur <WebsiteLink to="/">Réagir à l'information</WebsiteLink> en tant que{' '}
          <em>{ user.nick }</em>. La charte est accessible <WebsiteLink to="/charte.html">ici</WebsiteLink>.
        </Text>
      </Box>

      <Box mt={big} style={{ alignSelf: 'center' }}>
        <Form onSubmit={logout} loading={loading} submitButtonValue="Déconnexion" />
      </Box>

    </Box>
  );
};

export default LogoutView;
