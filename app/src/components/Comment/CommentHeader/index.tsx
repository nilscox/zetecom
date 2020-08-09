import React, { useState } from 'react';

import { UserAvatarNick } from 'src/components/UserAvatar';
import { useCurrentUser } from 'src/contexts/UserContext';
import { Comment } from 'src/types/Comment';
import env from 'src/utils/env';

import CommentDevTool from './CommentDevTool';
import EditButton from './EditButton';
import EditionDate from './EditionDate';
import ReportLink from './ReportLink';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette: { border }, spacing, breakpoints }) => ({
  header: {
    borderTop: `1px solid ${border.veryLight}`,
    borderBottom: `1px solid ${border.light}`,
    background: 'rgba(0, 0, 0, 0.02)',
  },
  left: {
    flexGrow: 1,
    padding: spacing(2),
    [breakpoints.down('xs')]: {
      padding: spacing(1),
    },
  },
  right: {
    paddingRight: spacing(2),
  },
}));

type CommentHeaderProps = {
  comment: Comment;
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({ comment, onEdit, onViewHistory, onReport }) => {
  const { author, edited, date } = comment;

  const [displayReportLink, setDisplayReportLink] = useState(false);
  const [showReportLink, hideReportLink] = [true, false].map(v => () => setDisplayReportLink(v));

  const user = useCurrentUser();
  const isCurrentUserAuthor = author.id === user?.id;

  const classes = useStyles();

  return (
    <Grid container className={`MuiPaper-rounded ${classes.header}`}>

      <Grid item className={classes.left}>
        <Grid container>

          <Grid item>
            <UserAvatarNick small user={isCurrentUserAuthor ? user : author} />
          </Grid>

          { onEdit && isCurrentUserAuthor && <EditButton onClick={onEdit} /> }

          { env.NODE_ENV === 'development' && <Grid item><CommentDevTool comment={comment} /></Grid> }

        </Grid>
      </Grid>

      <Grid item className={classes.right}>
        <Grid container onMouseEnter={showReportLink} onMouseLeave={hideReportLink}>

          { user && !isCurrentUserAuthor && <ReportLink show={displayReportLink} onClick={onReport} /> }

          <EditionDate edited={!!edited} date={edited || date} onViewHistory={onViewHistory} />

        </Grid>

      </Grid>

    </Grid>
  );
};

export default CommentHeader;
