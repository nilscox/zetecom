import React from 'react';

import styled from '@emotion/styled';

import Icon from 'src/components/elements/Icon/Icon';
import IconButton from 'src/components/elements/IconButton/IconButton';
import { Close } from 'src/components/icons';
import { UserLight } from 'src/types/User';

import { CommentHeaderContainer } from '../../Comment/CommentHeader/CommentHeader';
import UserAvatarNick from '../../UserAvatarNick/UserAvatarNick';

const CloseIconButton = styled(IconButton)`
  align-self: flex-start;
  margin-left: auto;
`;

type CommentFormHeaderProps = {
  type: 'root' | 'edition' | 'reply';
  user: UserLight;
  onClose?: () => void;
};

const CommentFormHeader: React.FC<CommentFormHeaderProps> = ({ type, user, onClose }) => {
  const closeIconTitle = {
    root: 'Fermer le formulaire',
    edition: "Fermer le formulaire d'édition",
    reply: 'Fermer le formulaire de réponse',
  }[type];

  return (
    <CommentHeaderContainer>
      <UserAvatarNick small user={user} />

      {onClose && (
        <CloseIconButton type="button" title={closeIconTitle} onClick={onClose}>
          <Icon size="small" as={Close} />
        </CloseIconButton>
      )}
    </CommentHeaderContainer>
  );
};

export default CommentFormHeader;
