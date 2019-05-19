import React, { useContext } from 'react';

import Typography from '../components/Typography';
import UserContext from '../contexts/userContext';
import ViewHeader from '../components/ViewHeader';

const PostSignupView: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <>
      <ViewHeader />
      <div style={{ padding: '0 40px' }}>
        <Typography>
          <>
            Pour finaliser votre inscription, un email vous a été envoyé à{' '}
            <code>{user && user.email}</code>.
          </>
        </Typography>
      </div>
    </>
  );
};

export default PostSignupView;
