import React from 'react';

import Typography from '../components/Typography';
import { ViewProps } from '../Popup';

const PostSignupView: React.FC<ViewProps> = ({ user }) => {
  return (
    <>
      <Typography>
        <>Pour finalisez votre inscription, un email a été envoyé à { user && user.email }.</>
      </Typography>
    </>
  );
};

export default PostSignupView;
