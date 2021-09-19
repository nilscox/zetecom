import React from 'react';

import styled from '@emotion/styled';

import { AuthenticationForm } from '~/components/domain/AuthenticationForm/AuthenticationForm';
import { domain } from '~/theme';

export const AuthenticationView: React.FC = () => <StyledAuthenticationForm />;

const StyledAuthenticationForm = styled(AuthenticationForm)`
  width: 100%;
  max-width: ${domain('authentication', 'maxWidth')};
  margin: auto;
  margin-top: ${domain('authentication', 'verticalSpace')};
  display: block;
`;
