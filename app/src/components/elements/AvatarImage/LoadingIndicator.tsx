import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { color } from 'src/theme';

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  top: -1px;
  left: -1px;
  border-top: 2px solid ${color('primary')};
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${loading} 750ms linear infinite;
`;

export default LoadingIndicator;
