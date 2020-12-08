import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import useAxios from 'src/hooks/use-axios';
import { Comment } from 'src/types/Comment';
import track from 'src/utils/track';

import CommentForm, { ClearFormRef } from './CommentForm';

type CommentEditionFormProps = {
  comment: Comment;
  onEdited: (comment: Comment) => void;
  closeForm?: () => void;
};

const CommentEditionForm: React.FC<CommentEditionFormProps> = ({ comment, onEdited, closeForm }) => {
  const trackEvent = useTrackEvent();

  const formRef = React.useRef<ClearFormRef>(null);

  const opts: AxiosRequestConfig = { method: 'PUT', url: `/api/comment/${comment.id}` };
  const [{ data, loading, error }, postComment] = useAxios(opts, { manual: true }, Comment);

  if (error) {
    throw error;
  }

  const onSubmit = (text: string) => postComment({ data: { text } });

  useEffect(() => {
    if (data) {
      trackEvent(track.commentEdited());
      onEdited(data);

      if (formRef.current) {
        formRef.current.clear();
      }
    }
  }, [data, onEdited, formRef, trackEvent]);

  return (
    <CommentForm
      ref={formRef}
      placeholder="Éditez votre message..."
      preloadedMessage={comment.text}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default CommentEditionForm;
