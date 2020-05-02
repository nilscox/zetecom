import React from 'react';

import Box from './components/common/Box';
import Flex from './components/common/Flex';
import Loader from './components/common/Loader';
import Text from './components/common/Text';
import useAxios from './hooks/use-axios';
import useQueryString from './hooks/use-query-string';
import { parseUser } from './types/User';
import { useTheme } from './utils/Theme';

const EmailLogin: React.FC = () => {
  const { sizes: { big } } = useTheme();
  const { token } = useQueryString();

  const [{ loading, error, status }] = useAxios({
    method: 'POST',
    url: '/api/auth/email-login',
    data: { token },
  }, parseUser);

  const renderErrorText = () => {
    if (status(403))
      return <Text>Vous êtes déjà connecté.</Text>;

    if (status(401))
      return <Text>Le lien que vous avez utilisé n'est pas valide.</Text>;

    return <Text>Quelque chose c'est mal passé, veuillez réessayer.</Text>;
  };

  return (
    <Box style={{ width: 400, margin: '300px auto', border: '1px solid #ccc' }}>

      <Flex m={big} flexDirection="column" alignItems="center" justifyContent="center">

        { loading && (
          <>
            <Text>Connexion en cours</Text>
            <Loader />
          </>
        ) }

        { status(200) && <Text>Connexion réussie. Ouvrez l'extension pour changer votre mot de passe</Text> }

        { error && renderErrorText() }

      </Flex>
    </Box>
  );
};

export default EmailLogin;
