import React, { useRef } from 'react';

import CommentsAreaForm, { CommentsAreaFormRef } from 'src/components/domain/CommentsAreaForm/CommentAreaForm';
import useFormErrors from 'src/hooks/useFormErrors';
import { CommentsArea } from 'src/types/CommentsArea';

import useCommentsAreaForm from './hooks/useCommentsAreaForm';

type CommentsAreaFormContainerProps = {
  type: 'request' | 'creation';
  onCancel: () => void;
  onSuccess: (commentsArea: CommentsArea) => void;
};

const CommentsAreaFormContainer: React.FC<CommentsAreaFormContainerProps> = ({ type, onCancel, onSuccess }) => {
  const ref = useRef<CommentsAreaFormRef>(null);

  const [{ fieldErrors }, { handleError, clearFieldError }] = useFormErrors();
  const [onSubmit, { loading }] = useCommentsAreaForm(type, ref.current?.reset ?? (() => {}), onSuccess, handleError);

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
