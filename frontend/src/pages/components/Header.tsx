import React from 'react';

import { useCurrentUser } from 'src/utils/UserContext';
import UserAvatar from 'src/components/common/UserAvatar';
import Flex from 'src/components/common/Flex';

const TITLE = 'Chercheurs de vérité';
const SUBTITLE = 'Décryptons l\'information !';

const Header: React.FC = () => {
  const user = useCurrentUser();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid #CCC',
        paddingBottom: 15,
      }}
    >

      <Flex flexDirection="row" alignItems="flex-start" style={{ height: 90 }}>

        <img
          src="/assets/images/logo.png"
          alt="logo"
          style={{ height: '100%', width: 'auto', marginTop: -6, opacity: 0.8 }}
        />

        <Flex flexDirection="column" pl={15}>

          <h1
            style={{
              flex: 1,
              fontSize: '3rem',
              lineHeight: '3rem',
              fontFamily: 'domine',
            }}
          >
            { TITLE }
          </h1>

          <div
            style={{
              flex: 1,
              fontSize: '1.5rem',
              color: '#666',
              letterSpacing: '6px',
              textAlign: 'left',
              marginLeft: 3,
            }}
          >
            { SUBTITLE }
          </div>

        </Flex>

      </Flex>

      { user && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <UserAvatar editable user={user} />
          <div style={{ marginLeft: 10, fontWeight: 'bold' }}>{ user.nick }</div>
        </div>
      ) }

    </div>
  );
};

export default Header;
