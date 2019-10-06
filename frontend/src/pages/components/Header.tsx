import React from 'react';

import Flex from 'src/components/common/Flex';
import useResponsive from '../hooks/useResponsive';

const TITLE = 'Réagir à l\'information';
const SUBTITLE = 'Décryptons les médias !';

const Header: React.FC = () => {
  const { choose } = useResponsive(800);

  return (
    <Flex
      data-e2e="header"
      flexDirection="row"
      alignItems="center"
      mt={40}
      pb={15}
      style={{ borderBottom: '1px solid #CCC' }}
    >

      <Flex flexDirection="row" alignItems="flex-start" style={{ height: choose({ desktop: 90, mobile: 70 }) }}>

        <img
          src="/assets/images/logo.png"
          alt="logo"
          style={{ height: '100%', width: 'auto', marginTop: -6, opacity: 0.8 }}
        />

        <Flex flexDirection="column" pl={15}>

          <h1
            style={{
              flex: 1,
              ...choose({
                desktop: { fontSize: '3rem', lineHeight: '3rem' },
                mobile: { fontSize: '2rem', lineHeight: '2rem' },
              }),
              fontFamily: 'domine',
            }}
          >
            { TITLE }
          </h1>

          <div
            style={{
              flex: 1,
              ...choose({
                desktop: { fontSize: '1.5rem' },
                mobile: { fontSize: '1.2rem' },
              }),
              color: '#666',
              letterSpacing: choose({ mobile: 4, desktop: 6 }),
              textAlign: 'left',
              marginLeft: 3,
            }}
          >
            { SUBTITLE }
          </div>

        </Flex>

      </Flex>

    </Flex>
  );
};

export default Header;
