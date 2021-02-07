import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { color } from 'src/theme';

const width = keyframes`
  from {
    width: 0;
    left: 0;
  }

  to {
    width: 0;
    right: 0;
  }

  50% {
    width: 100%;
  }
`;

const LoadingIndicator = styled.div`
  border-bottom: 2px solid ${color('primary')};
  animation: ${width} 720ms linear infinite;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default LoadingIndicator;
