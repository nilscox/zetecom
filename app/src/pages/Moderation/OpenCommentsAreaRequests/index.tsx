import React from 'react';

import AsyncContent from '../../../components/AsyncContent';
import Fallback from '../../../components/Fallback';
import useAxiosPaginated from '../../../hooks/use-axios-paginated';
import { parseOpenCommentsAreaRequest } from '../../../types/CommentsArea';
import Section from '../Section';

import OpenCommentsAreaRequest from './OpenCommentsAreaRequest';

const OpenCommentsAreaRequests: React.FC = () => {
  const [{ loading, data: pendingRequests, error }] = useAxiosPaginated(
    '/api/comments-area-request',
    parseOpenCommentsAreaRequest,
  );

  if (error)
    throw error;

  return (
    <Section title="Ouverture de nouvelles zones de commentaires">
      <AsyncContent loading={loading}>
        {() => (
          <Fallback
            minHeight={100}
            when={pendingRequests?.length === 0}
            fallback="Toutes les demandes d'ouvertures de zones de commentaires ont été traitées."
          >
            {() => pendingRequests.map(({ id, identifier }, n) => (
              <OpenCommentsAreaRequest key={n} requestId={id} identifier={identifier} />
            ))}
          </Fallback>
        )}
      </AsyncContent>
    </Section>
  );
};

export default OpenCommentsAreaRequests;
