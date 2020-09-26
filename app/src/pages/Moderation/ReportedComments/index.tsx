import React from 'react';

import AsyncContent from '../../../components/AsyncContent';
import Fallback from '../../../components/Fallback';
import useAxiosPaginated from '../../../hooks/use-axios-paginated';
import useEditableDataset from '../../../hooks/use-editable-dataset';
import { parseReportedComment, ReportedComment as ReportedCommentType } from '../../../types/Report';
import Section from '../Section';

import ReportedComment from './ReportedComment';

const ReportedComments: React.FC = () => {
  const [{ data, loading }] = useAxiosPaginated('/api/moderation/reports', parseReportedComment);
  const [reportedComments, { remove }] = useEditableDataset(data);

  const handleModerated = (comment: ReportedCommentType) => {
    remove(comment);
  };

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
                {reportedComments.map((comment) => (
                  <ReportedComment
                    key={comment.id}
                    comment={comment}
                    reports={comment.reports}
                    onModerated={() => handleModerated(comment)}
                  />
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
