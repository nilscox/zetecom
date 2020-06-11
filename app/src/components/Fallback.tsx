import React from 'react';

import Flex from './Flex';

type FallbackProps = {
  when?: boolean;
  fallback: React.ReactNode;
  minHeight?: number;
};

const Fallback: React.FC<FallbackProps> = ({ when, fallback, minHeight = 200, children }) => {
  if (when) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight }}>
        { fallback }
      </Flex>
    );
  }

  if (typeof children !== 'function')
    throw new Error('Fallback: children must be a function');

  return children();
};

export default Fallback;
