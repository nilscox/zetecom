import React from 'react';

import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';

type CardProps = {
  text: string;
  subtext: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ text, subtext, image }) => {
  return (
    <Flex flexDirection="column" mx={10} flex={1}>

      <Flex flexDirection="column" alignItems="center" style={{ padding: 30, height: 140 }}>
        <img src={image} alt={text} style={{ height: '100%', opacity: 0.8 }} />
      </Flex>

      <Flex
        flexDirection="column"
        justifyContent="center"
        style={{
          height: 50,
          borderTop: '1px solid #CCC',
          borderBottom: '1px solid #CCC',
          marginBottom: 10,
        }}
      >
        <Text
          align="center"
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#444',
          }}
        >
          {text}
        </Text>
      </Flex>

      <Text>
        {subtext}
      </Text>

    </Flex>
  );
};

export default Card;
