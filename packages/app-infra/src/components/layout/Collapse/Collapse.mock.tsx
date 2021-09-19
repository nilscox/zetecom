import styled from '@emotion/styled';

import { CollapseProps } from './Collapse';

export const Collapse = styled.div<CollapseProps>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  visibility: ${({ open }) => (open ? 'visible' : 'collapse')};
`;
