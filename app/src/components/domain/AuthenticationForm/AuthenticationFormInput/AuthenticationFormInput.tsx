import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';

import Input from 'src/components/elements/Input/Input';
import { spacing } from 'src/theme';

const Container = styled.div`
  margin: ${spacing(1, 0)};
`;

const AuthenticationFormInput: React.FC<ComponentProps<typeof Input>> = props => (
  <Container>
    <Input fullWidth consistentHeight {...props} />
  </Container>
);

export default AuthenticationFormInput;
