import React from 'react';

import styled from '@emotion/styled';
import ReactCollapse from '@kunukn/react-collapse';

import { transition } from 'src/theme';

const StyledCollapse = styled(ReactCollapse)`
  transition: ${transition('fast', 'height', 'cubic-bezier(0.4, 0, 0.2, 1)')};
`;

export type CollapseProps = {
  in: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ in: isOpen, ...props }) => {
  return <StyledCollapse isOpen={isOpen} {...props} />;
};

export default Collapse;
