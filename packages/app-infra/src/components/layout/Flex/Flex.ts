import styled from '@emotion/styled';

import { spacing } from '~/theme';

import { Box, BoxProps } from '../Box/Box';

type FlexProps = BoxProps & {
  direction?: React.CSSProperties['flexDirection'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  rowGap?: React.CSSProperties['rowGap'];
  columnGap?: React.CSSProperties['columnGap'];
};

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  row-gap: ${({ rowGap }) => rowGap && spacing(rowGap)};
  column-gap: ${({ columnGap }) => columnGap && spacing(columnGap)};
`;
