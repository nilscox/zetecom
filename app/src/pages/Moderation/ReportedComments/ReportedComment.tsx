import React, { useCallback, useState } from 'react';

import { Card, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

import CommentComponent from '../../../components/Comment/CommentComponent';
import DisabledOverlay from '../../../components/DisabledOverlay';
import { Comment } from '../../../types/Comment';
import { Report } from '../../../types/Report';

import ReportedCommentActions from './ReportedCommentActions';

const useStyles = makeStyles(({ spacing }) => ({
  container: () => ({
    position: 'relative',
    padding: spacing(2),
    marginBottom: spacing(6),
    '&:last-child': {
      margin: 0,
    },
  }),
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
}));

type ReportedCommentProps = {
  comment: Comment;
  reports: Report[];
};

const ReportedComment: React.FC<ReportedCommentProps> = ({ comment, reports }) => {
  const [moderated, setModerated] = useState(false);
  const classes = useStyles({ moderated });

  const onModerated = useCallback(() => setModerated(true), []);

  return (
    <Card variant="outlined" className={classes.container}>
      <DisabledOverlay disabled={moderated} />

      <CommentComponent comment={comment} displayReplies={false} displayReplyForm={false} />

      <div style={{ margin: '24px 0 0 24px' }}>
        <Typography>Signalé par :</Typography>

        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <strong>{report.reportedBy.nick}</strong> le {dayjs(report.created).format('DD MM YYYY')}
              {report.message && (
                <div style={{ marginTop: 6 }}>
                  <TextField fullWidth disabled variant="outlined" label="Message" value={report.message} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Grid container className={classes.actionsContainer}>
        <ReportedCommentActions comment={comment} onModerated={onModerated} />
      </Grid>
    </Card>
  );
};

export default ReportedComment;
