import React, { useContext } from 'react';

import Typography from '../components/Typography';
import UserContext from '../../utils/UserContext';

const PostSignupView: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <div style={{ padding: '20px 40px' }}>
      <Typography>
        <>
          Pour finaliser votre inscription, un email vous a été envoyé à{' '}
          <code>{user && user.email}</code>.
        </>
      </Typography>
    </div>
  );
};

export default PostSignupView;
