import React, { useEffect, useState } from 'react';

import { Collapse } from '@material-ui/core';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import Link from 'src/components/Link';

import CommentsAreaForm, { CreateCommentsAreaFormState } from '../../../components/CommentsAreaForm';
import useFormErrors, { FormErrorsHandlers } from '../../../hooks/use-form-errors';
import { CommentsAreaRequest } from '../../../types/CommentsArea';

import CommentsAreaRequestModerationActions from './CommentsAreaRequestModerationActions';
import useCreateCommentsArea from './useCreateCommentsArea';
import useRejectCommentsAreaRequest from './useRejectCommentsAreaRequest';

const createCommentsAreaErrorsHandlers: FormErrorsHandlers<AxiosError, CreateCommentsAreaFormState> = [
  {
    informationUrl: ({ response: { status, data } }) => {
      if (status === 400 && data.informationUrl?.isNotEmpty) {
        return "Veillez renseigner l'url de l'information";
      }
    },
    informationTitle: ({ response: { status, data } }) => {
      if (status === 400 && data.informationTitle?.isNotEmpty) {
        return "Veillez renseigner le titre de l'information";
      }
    },
    informationAuthor: ({ response: { status, data } }) => {
      if (status === 400 && data.informationAuthor?.isNotEmpty) {
        return "Veillez renseigner l'auteur de l'information";
      }
    },
    informationPublicationDate: ({ response: { status, data } }) => {
      if (status === 400 && data.informationPublicationDate?.isDateString) {
        return 'Format invalide';
      }
    },
  },
  () => '',
];

type CreateCommentsAreaProps = {
  request: CommentsAreaRequest;
};

const CommentsAreaRequestModeration: React.FC<CreateCommentsAreaProps> = ({ request }) => {
  const [{ loading: createLoading, error, data: created }, create] = useCreateCommentsArea();
  const { loading: rejectLoading, rejected, reject } = useRejectCommentsAreaRequest(request.id);

  const [[fieldErrors, clearFieldError]] = useFormErrors(createCommentsAreaErrorsHandlers, error);

  useEffect(() => {
    if (created) {
      toast.success(
        <>
          La nouvelle zone de commentaires a bien été créé.{' '}
          <Link to={`/commentaires/${created.id}`} style={{ fontWeight: 'bold' }}>
            Voir
          </Link>
        </>,
      );
    }
  }, [created]);

  useEffect(() => {
    if (rejected) {
      toast.success(<>La nouvelle zone de commentaires a bien été refusée.</>);
    }
  }, [rejected]);

  const handleSubmit = (data: CreateCommentsAreaFormState) => {
    create({ data }).catch(() => {});
  };

  return (
    <Collapse in={!created && !rejected}>
      <CommentsAreaForm
        fieldErrors={fieldErrors}
        clearFieldError={clearFieldError}
        initialValues={request}
        onSubmit={handleSubmit}
      >
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
