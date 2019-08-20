import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

const PostSignupView: React.FC<RouteComponentProps> = () => {
  const { sizes: { big } } = useTheme();
  const user = useCurrentUser();

  return (
    <Box px={4 * big} py={2 * big}>
      <Text>
        <>
          Pour finaliser votre inscription, un email vous a été envoyé à{' '}
          <code>{user && user.email}</code>.
        </>
      </Text>
    </Box>
  );
};

export default PostSignupView;
