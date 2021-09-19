import { SVGProps } from 'react';

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { Box, BoxProps } from '~/components/layout/Box/Box';
import { color, spacing } from '~/theme';

export type IconProps = Omit<BoxProps, 'as'> & {
  as: React.ComponentType<SVGProps<SVGSVGElement>>;
  color?: keyof Theme['colors'];
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ as: Svg, ...props }) => {
  // svg are node loaded in test env
  if (typeof Svg !== 'function') {
    return null;
  }

  return <StyledIcon as={Svg} {...props} />;
};

const StyledIcon = styled(Box)<Pick<IconProps, 'color' | 'size'>>`
  color: ${({ color: themeColor = 'icon' }) => color(themeColor)};
  width: ${({ size = 4 }) => spacing(size)};
  height: ${({ size = 4 }) => spacing(size)};
`;
