import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';

import Input from 'src/components-v2/elements/Input/Input';
import { spacing } from 'src/theme';

const Container = styled.div`
  padding: ${spacing(2, 0)};
`;

const AuthenticationFormInput: React.FC<ComponentProps<typeof Input>> = props => (
  <Container>
    <Input fullWidth {...props} />
  </Container>
);

export default AuthenticationFormInput;
