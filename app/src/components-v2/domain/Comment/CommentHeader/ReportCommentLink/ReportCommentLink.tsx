import React from 'react';

import styled from '@emotion/styled';
import { darken } from 'polished';

import { color, fontSize, spacing, transition } from 'src/theme';

type StyledLinkProps = {
  visible: boolean;
};

const StyledLink = styled.span<StyledLinkProps>`
  margin-right: ${spacing(2)};
  text-decoration: none;
  color: ${color('error', darken(0.2))};
  font-weight: bold;
  font-size: ${fontSize('small')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: ${transition('slow', 'opacity')};
  cursor: pointer;
`;

type ReportCommentLinkProps = {
  className?: string;
  visible: boolean;
  onClick: () => void;
};

const ReportCommentLink: React.FC<ReportCommentLinkProps> = ({ className, visible, onClick }) => {
  return (
    <StyledLink className={className} visible={visible} role="link" onClick={onClick}>
      Signaler
    </StyledLink>
  );
};

export default ReportCommentLink;
