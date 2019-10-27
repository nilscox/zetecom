import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

const PasswordResetView: React.FC<RouteComponentProps> = () => {
  const { sizes: { big } } = useTheme();

  return (
    <Box px={4 * big}>
      <Text align="center">PasswordReset</Text>
    </Box>
  );
};

export default PasswordResetView;
