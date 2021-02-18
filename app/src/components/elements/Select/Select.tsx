import styled from '@emotion/styled';

import { borderRadius, color, spacing } from 'src/theme';

const Select = styled.select`
  padding: ${spacing(0.5, 1)};
  border: 1px solid ${color('border')};
  border-radius: ${borderRadius(1)};
  background-color: transparent;
`;

/** @component */
export default Select;
