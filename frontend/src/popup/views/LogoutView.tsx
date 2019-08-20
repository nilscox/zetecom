import React, { useContext } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import { useLogoutUser } from 'src/api/user';
import UserAvatar from 'src/components/common/UserAvatar';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import Form from '../components/Form';

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const { sizes: { medium, big } } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [logout, { loading, error }] = useLogoutUser();

  const logoutSubmit = async () => {
    await logout();

    setUser(null);
    history.push('/popup/login');
  };

  if (!user)
    return <Redirect to="/" />;

  if (!loading && error)
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
          Vous êtes connecté(e) sur <Link to="/" target="_blank">CDV</Link> en tant que <em>{ user.nick }</em>.
          La charte est accessible <Link to="/charte" target="_blank">ici</Link>.
        </Text>
      </Box>

      <Box mt={big} style={{ alignSelf: 'center' }}>
        <Form onSubmit={logoutSubmit} loading={loading} submitButtonValue="Déconnexion" />
      </Box>

    </Box>
  );
};

export default LogoutView;
