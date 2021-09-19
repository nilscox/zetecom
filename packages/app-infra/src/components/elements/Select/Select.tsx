import styled from '@emotion/styled';

import { color, font, fontSize, radius, spacing } from '~/theme';

export const Select = styled.select`
  padding: ${spacing(1, 2)};
  border: 1px solid ${color('border')};
  border-radius: ${radius('default')};
  font-family: ${font('monospace')};
  font-size: ${fontSize(1)};
  background-color: transparent;
  outline: none;
`;
