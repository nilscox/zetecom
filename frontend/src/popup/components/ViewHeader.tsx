import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTheme } from 'src/utils/Theme';
import Text from 'src/components/common/Text';
import Flex from 'src/components/common/Flex';

const ViewHeader: React.FC = () => {
  const { sizes: { medium, big } } = useTheme();

  return (
    <Flex
      my={10}
      pb={medium}
      style={{
        borderBottom: '1px solid #ccc',
      }}
    >

      <Flex
        flex={1}
        px={2 * big}
      >
        <NavLink
          to="/popup/login"
          style={{ color: '#999', textDecoration: 'none' }}
          activeStyle={{ color: '#222' }}
        >
          <Text variant="subtitle" style={{ color: 'inherit' }}>Connexion</Text>
        </NavLink>
      </Flex>

      <div style={{ borderLeft: '1px solid #CCC' }} />

      <Flex
        flex={1}
        px={2 * big}
      >
        <NavLink
          to="/popup/signup"
          style={{ color: '#999', textDecoration: 'none' }}
          activeStyle={{ color: '#222' }}
        >
          <Text variant="subtitle" style={{ color: 'inherit' }}>Inscription</Text>
        </NavLink>
      </Flex>

    </Flex>
  );
};

export default ViewHeader;
