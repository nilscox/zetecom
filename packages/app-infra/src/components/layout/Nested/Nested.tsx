import styled from '@emotion/styled';

import { spacing } from '~/theme';

import { Box, BoxProps } from '../Box/Box';

export const Nested: React.FC<BoxProps> = (props) => <StyledNested paddingLeft={2} {...props} />;

const StyledNested = styled(Box)`
  border-left: ${spacing(2)} solid #ccc;
`;
