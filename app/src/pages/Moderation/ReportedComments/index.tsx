import React from 'react';

import AsyncContent from '../../../components/AsyncContent';
import Fallback from '../../../components/Fallback';
import useAxiosPaginated from '../../../hooks/use-axios-paginated';
import { parseReportedComment } from '../../../types/Report';
import Section from '../Section';

import ReportedComment from './ReportedComment';

const ReportedComments: React.FC = () => {
  const [{ data: reportedComments, loading }] = useAxiosPaginated('/api/moderation/reports', parseReportedComment);

  return (
    <Section title="Commentaires signalés">
      <AsyncContent loading={loading}>
        {() => (
          <Fallback
            minHeight={100}
            when={reportedComments.length === 0}
            fallback="Aucun commentaire n'est en attente de modération."
          >
            {() => (
              <>
                {reportedComments.map(({ reports, ...comment }) => (
                  <ReportedComment key={comment.id} comment={comment} reports={reports} />
                ))}
              </>
            )}
          </Fallback>
        )}
      </AsyncContent>
    </Section>
  );
};

export default ReportedComments;
