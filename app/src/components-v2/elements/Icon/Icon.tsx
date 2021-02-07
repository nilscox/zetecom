import styled from '@emotion/styled';

import { spacing, Theme } from 'src/theme';

type IconProps = {
  color?: keyof Theme['colors'] | string;
};

const Icon = styled.svg<IconProps>`
  width: ${spacing(4)};
  height: ${spacing(4)};
  ${props => props.color && { color: props.theme.colors[props.color as keyof Theme['colors']] ?? props.color }}
`;

/** @component */
export default Icon;
