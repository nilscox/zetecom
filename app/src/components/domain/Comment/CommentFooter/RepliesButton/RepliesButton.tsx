/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing } from 'src/theme';

import Button from '../../../../elements/Button/Button';
import Icon from '../../../../elements/Icon/Icon';
import { CaretRight } from '../../../../icons';

const StyledRepliesButton = styled(Button)`
  padding-right: ${spacing(3)};
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: unset;
`;

type RepliesButtonProps = {
  disabled: boolean;
  loading: boolean;
  repliesOpen: boolean;
  repliesCount: number;
  onClick: () => void;
};

const RepliesButton: React.FC<RepliesButtonProps> = ({ disabled, loading, repliesOpen, repliesCount, onClick }) => (
  <StyledRepliesButton
    loading={loading}
    disabled={disabled || loading || repliesCount === 0}
    title="Voir les réponses"
    onClick={onClick}
  >
    <Icon
      as={CaretRight}
      size="small"
      css={theme => css`
        margin-right: ${theme.spacings[1]};
        transform: rotate(${repliesOpen ? 90 : 0}deg);
        transition: ${theme.transitions.fast} transform ease;
        display: ${repliesCount === 0 ? 'none' : undefined};
      `}
    />
    {repliesCount} réponse{repliesCount >= 2 ? 's' : ''}
  </StyledRepliesButton>
);

export default RepliesButton;
