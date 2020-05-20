import React, { useState } from 'react';

import UserAvatarNick from 'src/components/common/UserAvatarNick';
import { Reaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';

import EditButton from './EditButton';
import EditionDate from './EditionDate';
import ReportLink from './ReportLink';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette: { border }, spacing, breakpoints }) => ({
  header: {
    borderTop: `1px solid ${border.light}`,
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

type ReactionHeaderProps = {
  author: Reaction['author'];
  date: Reaction['date'];
  edited: Reaction['edited'];
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, date, edited, onEdit, onViewHistory, onReport }) => {
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

export default ReactionHeader;
