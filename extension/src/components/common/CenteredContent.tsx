import React from 'react';

import Flex from './Flex';

type CenteredContentProps = {
  minHeight?: number;
};

const CenteredContent: React.FC<CenteredContentProps> = ({ minHeight = 200, children }) => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight }}>
      { children }
    </Flex>
  );
};

export default CenteredContent;
