import React, { useContext } from 'react';

import Typography from '../components/Typography';
import UserContext from '../contexts/userContext';
import ViewHeader from '../components/ViewHeader';

const PostSignupView: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <>
      <ViewHeader />
      <Typography>
        <>Pour finalisez votre inscription, un email a été envoyé à { user && user.email }.</>
      </Typography>
    </>
  );
};

export default PostSignupView;
