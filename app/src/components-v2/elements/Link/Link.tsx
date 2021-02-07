import styled from '@emotion/styled';
import { Link as RRLink } from 'react-router-dom';

import { textColor } from 'src/theme';

const Link = styled(RRLink)`
  color: ${textColor('link')};
  outline: none;

  &:focus {
    color: ${textColor('linkFocused')};
  }
`;

/** @component */
export default Link;
