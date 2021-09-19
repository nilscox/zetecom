import React from 'react';

import styled from '@emotion/styled';
import ReactCollapse from '@kunukn/react-collapse';

export type CollapseProps = {
  open: boolean;
};

export const Collapse: React.FC<CollapseProps> = ({ open, ...props }) => {
  return <StyledCollapse isOpen={open} {...props} />;
};

const StyledCollapse = styled(ReactCollapse)`
  transition: height 125ms cubic-bezier(0.4, 0, 0.2, 1);
`;
