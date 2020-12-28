import React, { useEffect } from 'react';

import { Collapse } from '@material-ui/core';
import { toast } from 'react-toastify';

import CommentsAreaForm from 'src/components/CommentsAreaForm';
import createCommentsAreaErrorsHandlers from 'src/components/CommentsAreaForm/createCommentsAreaErrorsHandlers';
import { CreateCommentsAreaFormState } from 'src/components/CommentsAreaForm/useCommentsAreaForm';
import Link from 'src/components/Link';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import useFormErrors from 'src/hooks/use-form-errors';
import { CommentsAreaRequest } from 'src/types/CommentsArea';
import track from 'src/utils/track';

import CommentsAreaRequestModerationActions from './CommentsAreaRequestModerationActions';
import useCreateCommentsArea from './useCreateCommentsArea';
import useRejectCommentsAreaRequest from './useRejectCommentsAreaRequest';

type CreateCommentsAreaProps = {
  request: CommentsAreaRequest;
};

const CommentsAreaRequestModeration: React.FC<CreateCommentsAreaProps> = ({ request }) => {
  const trackEvent = useTrackEvent();

  const [{ loading: createLoading, error, data: created }, create] = useCreateCommentsArea();
  const { loading: rejectLoading, rejected, reject } = useRejectCommentsAreaRequest(request.id);

  const [[fieldErrors]] = useFormErrors(createCommentsAreaErrorsHandlers, error);

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

      trackEvent(track.createCommentsArea());
    }
  }, [created, trackEvent]);

  useEffect(() => {
    if (rejected) {
      toast.info(<>La demande d'ouverture a bien été refusée.</>);
      trackEvent(track.commentsAreaRequestRejected());
    }
  }, [rejected, trackEvent]);

  const handleSubmit = (data: CreateCommentsAreaFormState) => {
    create({ data }).catch(() => {});
  };

  return (
    <Collapse in={!created && !rejected}>
      <CommentsAreaForm
        requiredFields={[
          'informationUrl',
          'informationTitle',
          'informationAuthor',
          'informationPublicationDate',
          'imageUrl',
        ]}
        initialValues={{ ...request, integrationIdentifier: request.identifier }}
        fieldsErrors={fieldErrors}
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
