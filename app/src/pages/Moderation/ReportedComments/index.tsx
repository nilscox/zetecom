import React from 'react';

import AsyncContent from 'src/components/AsyncContent';
import Fallback from 'src/components/Fallback';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { ReportedComment as ReportedCommentType } from 'src/types/Report';

import Section from '../Section';

import ReportedComment from './ReportedComment';

const ReportedComments: React.FC = () => {
  const [{ data: reportedComments, loading, error }] = useAxiosPaginated(
    '/api/moderation/reports',
    undefined,
    ReportedCommentType,
  );

  if (error) {
    throw error;
  }

  return (
    <Section title="Commentaires signalés">
      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            minHeight={100}
            when={reportedComments?.length === 0}
            fallback="Aucun commentaire n'est en attente de modération."
            render={() => (
              <>
                {reportedComments?.map(comment => (
                  <ReportedComment key={comment.id} comment={comment} reports={comment.reports} />
                ))}
              </>
            )}
          />
        )}
      />
    </Section>
  );
};

export default ReportedComments;
