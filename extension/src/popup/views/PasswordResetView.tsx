import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import { useTheme } from 'src/utils/Theme';

const PasswordResetView: React.FC<RouteComponentProps> = () => {
  const { sizes: { big } } = useTheme();

  return (
    <Box px={4 * big}>
      <Text align="center">PasswordReset</Text>
    </Box>
  );
};

export default PasswordResetView;
