/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '../../../../elements/Button/Button';
import Icon from '../../../../elements/Icon/Icon';
import { CaretRight } from '../../../../icons';

const StyledRepliesButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: unset;
`;

type RepliesButtonProps = {
  loading: boolean;
  repliesOpen: boolean;
  repliesCount: number;
  onClick: () => void;
};

const RepliesButton: React.FC<RepliesButtonProps> = ({ loading, repliesOpen, repliesCount, onClick }) => (
  <StyledRepliesButton loading={loading} title="Voir les réponses" onClick={onClick}>
    <Icon
      as={CaretRight}
      size="small"
      css={theme => css`
        margin-right: ${theme.spacings[1]};
        transform: rotate(${repliesOpen ? 90 : 0}deg);
        transition: ${theme.transitions.fast} transform ease;
      `}
    />
    {repliesCount} réponses
  </StyledRepliesButton>
);

export default RepliesButton;
