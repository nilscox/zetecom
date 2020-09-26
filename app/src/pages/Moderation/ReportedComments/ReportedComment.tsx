import React from 'react';

import { Card, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { format } from 'date-fns';

import CommentComponent from '../../../components/Comment/CommentComponent';
import { Comment } from '../../../types/Comment';
import { Report } from '../../../types/Report';

import ReportedCommentActions from './ReportedCommentActions';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    padding: spacing(2),
    marginBottom: spacing(6),
    '&:last-child': {
      margin: 0,
    },
  },
}));

type ReportedCommentProps = {
  comment: Comment;
  reports: Report[];
  onModerated: () => void;
};

const ReportedComment: React.FC<ReportedCommentProps> = ({ comment, reports, onModerated }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.container}>
      <CommentComponent
        comment={comment}
        displayReplies={false}
        displayReplyForm={false}
        toggleReplies={() => {}}
        onReply={() => {}}
        onViewHistory={() => {}}
        onReport={() => {}}
      />
      <div style={{ margin: '24px 0 0 24px' }}>
        <Typography>Signalé par :</Typography>
        <ul>
          {reports.map(report => (
            <li key={report.id}>
              <strong>{report.reportedBy.nick}</strong> le {format(report.created, 'dd MM yyyy')}
              {report.message && (
                <div style={{ marginTop: 6 }}>
                  <TextField fullWidth disabled variant="outlined" label="Message" value={report.message} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Grid container style={{ flex: 1, justifyContent: 'flex-end' }}>
        <ReportedCommentActions comment={comment} onModerated={onModerated} />
      </Grid>
    </Card>
  );
};

export default ReportedComment;
