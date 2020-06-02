import React from 'react';

import Flex from './components/Flex';
import HeaderLogo from './components/HeaderLogo';
import useAxios from './hooks/use-axios';
import useQueryString from './hooks/use-query-string';
import { parseUser } from './types/User';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useErrorMessage = (status: (s: number) => boolean) => {
  if (status(403))
    return 'Vous êtes déjà connecté.';

  if (status(401))
    return 'Le lien que vous avez utilisé n\'est pas valide.';

  return 'Quelque chose s\'est mal passé, veuillez réessayer.';
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    border: '1px solid #ccc',
  },
  headerLogo: {
    padding: theme.spacing(2),
  },
}));

const EmailLogin: React.FC = () => {
  const { token } = useQueryString();
  const classes = useStyles();
  const theme = useTheme();

  const [{ loading, error, status }] = useAxios({
    method: 'POST',
    url: '/api/auth/email-login',
    data: { token },
  }, parseUser);

  const errorMessage = useErrorMessage(status);

  return (
    <div className={classes.container}>

      <HeaderLogo className={classes.headerLogo} />

      <Flex p={theme.spacing(2)} flexDirection="column">

        { loading && <CircularProgress style={{ alignSelf: 'center' }} /> }

        { status(200) && (
          <Typography>
            Vous êtes maintenant connecté.e. Vous pouvez changer votre mot de passe depuis la popup de l'extension.
          </Typography>
        ) }

        { error && <Typography color="error">{ errorMessage }</Typography> }

      </Flex>

    </div>
  );
};

export default EmailLogin;
