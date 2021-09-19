import styled from '@emotion/styled';

import { Box, BoxProps } from '~/components/layout/Box/Box';
import { color, fontSize, fontWeight, lineHeight, Theme } from '~/theme';

type TextProps = BoxProps & {
  fontWeight?: keyof Theme['fontWeights'];
  fontSize?: keyof Theme['fontSizes'];
  lineHeight?: keyof Theme['lineHeights'];
  color?: keyof Theme['colors'];
};

export const Text = styled(Box)<TextProps>`
  font-weight: ${({ fontWeight: value }) => value !== undefined && fontWeight(value)};
  font-size: ${({ fontSize: value }) => value !== undefined && fontSize(value)};
  line-height: ${({ lineHeight: value }) => value !== undefined && lineHeight(value)};
  color: ${({ color: value }) => value !== undefined && color(value)};
`;

Text.defaultProps = { as: 'span' };
