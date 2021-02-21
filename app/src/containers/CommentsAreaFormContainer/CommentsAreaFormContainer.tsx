import React, { useCallback, useRef } from 'react';

import { AxiosError } from 'axios';

import CommentsAreaForm, { CommentsAreaFormRef } from 'src/components/domain/CommentsAreaForm/CommentAreaForm';
import { CommentsArea } from 'src/types/CommentsArea';

import useCommentsAreaForm from './hooks/useCommentsAreaForm';

type CommentsAreaFormContainerProps = {
  type: 'request' | 'creation';
  onCancel: () => void;
  onSuccess: (commentsArea: CommentsArea) => void;
  onError: (error: AxiosError) => void;
};

const CommentsAreaFormContainer: React.FC<CommentsAreaFormContainerProps> = ({
  type,
  onCancel,
  onSuccess,
  onError,
}) => {
  const ref = useRef<CommentsAreaFormRef>(null);

  const [{ loading, fieldErrors, clearFieldError }, onSubmit] = useCommentsAreaForm(
    type,
    useCallback(() => ref.current?.reset(), []),
    onSuccess,
    onError,
  );

  return (
    <CommentsAreaForm
      ref={ref}
      fieldErrors={fieldErrors}
      clearFieldError={clearFieldError}
      isSubmitting={loading}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export default CommentsAreaFormContainer;
