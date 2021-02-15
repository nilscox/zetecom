import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';

import Input from 'src/components/elements/Input/Input';
import { spacing } from 'src/theme';

const Container = styled.div`
  margin: ${spacing(1, 0)};
`;

const CommentsAreaFormInput = <T extends typeof Input>(props: ComponentProps<T>) => (
  <Container>
    <Input fullWidth consistentHeight autoComplete="off" {...props} />
  </Container>
);

export default CommentsAreaFormInput;
