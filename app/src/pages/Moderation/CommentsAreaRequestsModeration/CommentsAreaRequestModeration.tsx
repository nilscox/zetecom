import React, { useEffect } from 'react';

import { Collapse } from '@material-ui/core';
import { toast } from 'react-toastify';

import CommentsAreaForm from 'src/components/CommentsAreaForm';
import createCommentsAreaErrorsHandlers from 'src/components/CommentsAreaForm/createCommentsAreaErrorsHandlers';
import useCommentsAreaForm, { CreateCommentsAreaFormState } from 'src/components/CommentsAreaForm/useCommentsAreaForm';
import Link from 'src/components/Link';
import useFormErrors from 'src/hooks/use-form-errors';
import { CommentsAreaRequest } from 'src/types/CommentsArea';

import CommentsAreaRequestModerationActions from './CommentsAreaRequestModerationActions';
import useCreateCommentsArea from './useCreateCommentsArea';
import useRejectCommentsAreaRequest from './useRejectCommentsAreaRequest';

type CreateCommentsAreaProps = {
  request: CommentsAreaRequest;
};

const CommentsAreaRequestModeration: React.FC<CreateCommentsAreaProps> = ({ request }) => {
  const [{ loading: createLoading, error, data: created }, create] = useCreateCommentsArea();
  const { loading: rejectLoading, rejected, reject } = useRejectCommentsAreaRequest(request.id);

  const [[fieldErrors]] = useFormErrors(createCommentsAreaErrorsHandlers, error);
  const formState = useCommentsAreaForm(request, fieldErrors);

  useEffect(() => {
    if (created) {
      formState[0].clear();
      toast.success(
        <>
          La nouvelle zone de commentaires a bien été créé.{' '}
          <Link to={`/commentaires/${created.id}`} style={{ fontWeight: 'bold' }}>
            Voir
          </Link>
        </>,
      );
    }
  }, [created, formState]);

  useEffect(() => {
    if (rejected) {
      formState[0].clear();
      toast.success(<>La nouvelle zone de commentaires a bien été refusée.</>);
    }
  }, [rejected, formState]);

  const handleSubmit = (data: CreateCommentsAreaFormState) => {
    create({ data }).catch(() => {});
  };

  return (
    <Collapse in={!created && !rejected}>
      <CommentsAreaForm formState={formState} onSubmit={handleSubmit}>
        <CommentsAreaRequestModerationActions
          createLoading={createLoading}
          rejectLoading={rejectLoading}
          onReject={reject}
        />
      </CommentsAreaForm>
    </Collapse>
  );
};

export default CommentsAreaRequestModeration;
