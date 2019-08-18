import React, { useContext } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import { useLogoutUser } from 'src/api/user';
import UserAvatar from 'src/components/common/UserAvatar';
import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';

import Typography from '../components/Typography';
import Form from '../components/Form';

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const { sizes: { big } } = useTheme();
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
          <UserAvatar user={user} />
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
            Vous êtes connecté(e) sur <Link to="/" target="_blank">CDV</Link> en tant que <em>{ user.nick }</em>.
            La charte est accessible <Link to="/charte" target="_blank">ici</Link>.
          </>
        </Typography>

        <Form onSubmit={logoutSubmit}>
          <Box my={big} pt={2 * big} style={{ alignSelf: 'center' }}>
            <Button type="submit" size="big" loading={loading}>Déconnexion</Button>
          </Box>
        </Form>

      </div>
    </>
  );
};

export default LogoutView;
