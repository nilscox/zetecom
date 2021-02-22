import React from 'react';

import styled from '@emotion/styled';

import { color, fontSize } from 'src/theme';

const StyledBadge = styled.span`
  position: relative;
  display: inline-block;
`;

const Value = styled.span`
  position: absolute;
  z-index: 1;
  top: -8px;
  right: -8px;
  padding: 4px;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: ${fontSize('small')};
  background-color: ${color('primary')};
  border-radius: 50%;
`;

type BadgeProps = {
  value: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = ({ value, children }) => {
  return (
    <StyledBadge>
      {value !== undefined && <Value>{value}</Value>}
      {children}
    </StyledBadge>
  );
};

export default Badge;
