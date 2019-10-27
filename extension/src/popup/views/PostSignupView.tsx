import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { useTheme } from 'src/utils/Theme';
import { useCurrentUser } from 'src/hooks/use-user';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

const PostSignupView: React.FC<RouteComponentProps> = () => {
  const { sizes: { big } } = useTheme();
  const user = useCurrentUser();

  if (!user)
    return <Redirect to="/popup/login" />;

  return (
    <Box px={4 * big} py={2 * big}>
      <Text>
        <>
          Pour finaliser votre inscription, un email vous a été envoyé à{' '}
          <code>{user.email}</code>.
        </>
      </Text>
    </Box>
  );
};

export default PostSignupView;
