import React from 'react';

import styled from '@emotion/styled';

import { color, spacing } from 'src/theme';

const Container = styled.div`
  margin-top: ${spacing(2)};
  display: flex;
  flex-direction: row;
`;

const Bar = styled.div<{ negativeMargin?: boolean }>`
  margin-right: ${spacing(2)};
  border-left: 6px solid ${color('border')};
  ${({ negativeMargin, theme }) => ({ marginTop: negativeMargin ? '-' + theme.spacings[2] : 0 })}
`;

const Content = styled.div`
  flex: 1;
`;

type NestedProps = {
  barNegativeMargin?: boolean;
};

const Nested: React.FC<NestedProps> = ({ barNegativeMargin, children }) => (
  <Container>
    <Bar negativeMargin={barNegativeMargin} />
    <Content>{children}</Content>
  </Container>
);

export default Nested;
