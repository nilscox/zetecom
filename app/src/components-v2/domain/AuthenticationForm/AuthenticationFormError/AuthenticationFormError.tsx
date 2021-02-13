import React from 'react';

import styled from '@emotion/styled';

import Fade from 'src/components-v2/layout/Fade/Fade';
import { fontWeight, spacing, textColor } from 'src/theme';

const StyledError = styled(Fade)`
  margin: ${spacing(2, 0)};
  color: ${textColor('error')};
  font-weight: ${fontWeight('bold')};
`;

type FormErrorProps = {
  error: React.ReactNode;
};

const AuthenticationFormError: React.FC<FormErrorProps> = ({ error }) => {
  return <StyledError in>{error}</StyledError>;
};

export default AuthenticationFormError;
