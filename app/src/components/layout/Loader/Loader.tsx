/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react';

import { Theme } from '../../../theme/theme';

// https://medium.com/@clg/animated-svg-spinner-8dff32d310fc

const spinner = keyframes`
  0% {
    stroke-dashoffset: ${0.66 * 40};
    transform: rotate(0deg);
  }

  50% {
    stroke-dashoffset: ${Math.PI * 40};
    transform: rotate(720deg);
  }

  100% {
    stroke-dashoffset: ${0.66 * 40};
    transform: rotate(1080deg);
  }
`;

type LoaderProps = {
  className?: string;
  color?: keyof Theme['colors'];
};

const Loader: React.FC<LoaderProps> = ({ className, color = 'primary' }) => (
  <svg
    x="0"
    y="0"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    css={theme => color && { color: theme.colors[color] }}
    className={className}
  >
    <circle
      cx="20"
      cy="20"
      r="18"
      css={css`
        fill: transparent;
        stroke: #eee;
        stroke-width: 4;
      `}
    />
    <circle
      cx="20"
      cy="20"
      r="18"
      css={css`
        fill: transparent;
        stroke: currentColor;
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: ${Math.PI * 40};
        transform-origin: 20px 20px 0;
        animation: ${spinner} 2s linear infinite;
      `}
    />
  </svg>
);

export default Loader;
