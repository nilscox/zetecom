import React from 'react';

import { RouteComponentProps } from 'react-router';

import UserAvatarNick from 'src/components/domain/UserAvatarNick/UserAvatarNick';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import useAxios from 'src/hooks/useAxios';
import PopupContainer from 'src/popups/components/PopupContainer/PopupContainer';
import PopupTitle from 'src/popups/components/PopupTitle/PopupTitle';
import { Comment, Message } from 'src/types/Comment';

import CommentRevisions from './CommentRevisions/CommentRevisions';

type HistoryPopupProps = RouteComponentProps<{ id: string }>;

const HistoryPopup: React.FC<HistoryPopupProps> = ({ match }) => {
  const commentId = match.params.id;

  const [comment, { loading: commentLoading }] = useAxios<Comment>(`/api/comment/${commentId}`);
  const [history = [], { loading: historyLoading }] = useAxios<Message[]>(`/api/comment/${commentId}/history`);

  return (
    <AsyncContent
      loading={commentLoading || historyLoading}
      render={() => (
        <PopupContainer>
          <PopupTitle>Historique d'édition</PopupTitle>

          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <UserAvatarNick user={comment!.author} />

          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <CommentRevisions history={history!} />
        </PopupContainer>
      )}
    />
  );
};

export default HistoryPopup;
