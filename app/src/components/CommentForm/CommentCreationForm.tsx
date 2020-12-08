import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useCommentsArea } from 'src/contexts/CommentsAreaContext';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import useAxios from 'src/hooks/use-axios';
import { Comment } from 'src/types/Comment';
import track from 'src/utils/track';

import CommentForm from './CommentForm';

type CommentCreationFormProps = {
  parent?: Comment;
  closeForm?: () => void;
  onCreated: (comment: Comment) => void;
};

const CommentCreationForm: React.FC<CommentCreationFormProps> = ({ parent, closeForm, onCreated }) => {
  const trackEvent = useTrackEvent();

  const commentsArea = useCommentsArea();

  // eslint-disable-next-line func-call-spacing
  const formRef = React.useRef<{ clear: () => void } | null>(null);

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/comment' };
  const [{ data, loading, error }, postComment] = useAxios(opts, { manual: true }, Comment);

  if (error) {
    throw error;
  }

  const onSubmit = (text: string) =>
    postComment({
      data: {
        commentsAreaId: commentsArea.id,
        parentId: parent ? parent.id : undefined,
        text,
      },
    });

  useEffect(() => {
    if (data) {
      trackEvent(track.commentCreated());
      onCreated(data);

      if (formRef.current) {
        formRef.current.clear();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formRef]);

  const getPlaceholder = () => {
    return parent ? `Répondez à ${parent.author.nick}` : 'Composez votre message...';
  };

  return (
    <CommentForm
      ref={formRef}
      placeholder={getPlaceholder()}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default CommentCreationForm;
