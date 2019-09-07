import React from 'react';

import Box from 'src/components/common/Box';

const Title: React.FC = ({ children }) => (
  <Box mt={40} mb={20}>
    <div style={{ fontFamily: 'domine' }}>
      <h2 style={{ fontSize: '2rem', lineHeight: '2rem' }}>{ children }</h2>
    </div>
  </Box>
);

export default Title;
