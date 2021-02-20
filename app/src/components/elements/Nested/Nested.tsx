import React from 'react';

import styled from '@emotion/styled';

import { color, spacing } from 'src/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Bar = styled.div<{ negativeMargin?: boolean }>`
  margin-right: ${spacing(2)};
  border-left: 6px solid ${color('border')};
`;

const Content = styled.div`
  flex: 1;
`;

type NestedProps = {
  className?: string;
};

const Nested: React.FC<NestedProps> = ({ className, children }) => (
  <Container className={className}>
    <Bar className="bar" />
    <Content>{children}</Content>
  </Container>
);

export default Nested;
