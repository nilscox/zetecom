import React from 'react';

import axios from 'axios';
import { QueryFunction, useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router';

import UserAvatarNick from 'src/components/domain/UserAvatarNick/UserAvatarNick';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import useComment from 'src/hooks/domain/useComment';
import PopupContainer from 'src/popups/components/PopupContainer/PopupContainer';
import PopupTitle from 'src/popups/components/PopupTitle/PopupTitle';
import { Message } from 'src/types/Comment';

import CommentRevisions from './CommentRevisions/CommentRevisions';

const fetchHistory: QueryFunction<Message[]> = async ({ queryKey: [, { commentId }] }) => {
  const response = await axios.get<Message[]>(`/api/comment/${String(commentId)}/history`);

  return response.data;
};

const useHistory = (commentId: number | string) => {
  const { data: history, isLoading: loadingHistory } = useQuery(['commentHistory', { commentId }], fetchHistory);

  return [history, { loadingHistory }] as const;
};

type HistoryPopupProps = RouteComponentProps<{ id: string }>;

const HistoryPopup: React.FC<HistoryPopupProps> = ({ match }) => {
  const commentId = match.params.id;

  const [comment, { loadingComment }] = useComment(commentId);
  const [history = [], { loadingHistory }] = useHistory(commentId);

  return (
    <AsyncContent
      loading={loadingComment || loadingHistory}
      render={() => (
        <PopupContainer>
          <PopupTitle>Historique d'édition</PopupTitle>
          {comment && <UserAvatarNick user={comment.author} />}
          <CommentRevisions history={history ?? []} />
        </PopupContainer>
      )}
    />
  );
};

export default HistoryPopup;
