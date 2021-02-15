import styled from '@emotion/styled';

import { Theme } from 'src/theme';

type IconProps = {
  color?: keyof Theme['colors'] | string;
  size?: 'small';
};

const Icon = styled.svg<IconProps>`
  width: ${props => props.spacing};
  width: ${props => props.theme.spacings[props.size === 'small' ? 3 : 4]};
  height: ${props => props.theme.spacings[props.size === 'small' ? 3 : 4]};
  ${props => props.color && { color: props.theme.colors[props.color as keyof Theme['colors']] ?? props.color }}
`;

/** @component */
export default Icon;
