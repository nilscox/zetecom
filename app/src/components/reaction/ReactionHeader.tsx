import React, { useState } from 'react';

import moment from 'moment';

import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';
import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import { useCurrentUser } from 'src/utils/UserContext';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

type ReportButtonProps = {
  show: boolean;
  onClick: () => void;
};

const ReportButton: React.FC<ReportButtonProps> = ({ show, onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      style={{ opacity: show ? 1 : 0, transition: 'opacity 160ms ease' }}
      color="textWarning"
      text={{ style: { fontSize: '11px', display: 'block', position: 'relative', top: -1 } }}
    >
      Signaler
    </Button>
  );
};

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button
      title="Éditer votre message"
      onClick={onClick}
      color="textLight"
      size="big"
      text={{
        style: {
          fontWeight: 'normal',
          lineHeight: '15px',
        },
      }}
    >
      ✎
    </Button>
  );
};

const useStyles = makeStyles(({ palette: { border }, spacing, breakpoints }) => ({
  header: {
    borderTop: `1px solid ${border.light}`,
    borderBottom: `1px solid ${border.light}`,
    position: 'relative',
    padding: spacing(2),
    [breakpoints.down('xs')]: {
      padding: spacing(1),
    },
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
  const { sizes: { small, medium } } = useTheme();
  const classes = useStyles();

  const [displayReportButton, setDisplayReportButton] = useState(false);
  const [showReportButton, hideReportButton] = [true, false].map(v => () => setDisplayReportButton(v));
  const user = useCurrentUser();
  const isCurrentUserAuthor = author.id === user?.id;

  return (
    <Grid
      container
      className={`MuiPaper-rounded ${classes.header}`}
    >

      <UserAvatarNick small user={isCurrentUserAuthor ? user : author} />

      <Flex
        flexDirection="row"
        pt={small}
        pr={medium}
        style={{ position: 'absolute', top: 0, right: 0, lineHeight: '15px' }}
        onMouseEnter={showReportButton}
        onMouseLeave={hideReportButton}
      >

        { user && !isCurrentUserAuthor && <ReportButton show={displayReportButton} onClick={onReport} /> }

        { !edited ? (
          <Typography variant="caption">
            { moment(date).format(DATE_FORMAT) }
          </Typography>
        ) : (
          <Text
            variant="note"
            title="Édité"
            style={{ fontStyle: 'oblique', cursor: 'pointer' }}
            onClick={onViewHistory}
          >
            *&nbsp;{ moment(edited).format(DATE_FORMAT) }
          </Text>
        ) }

      </Flex>

      { onEdit && (
        <Box pt={small} pr={medium} style={{ position: 'absolute', bottom: 0, right: 0 }}>
          { isCurrentUserAuthor && <EditButton onClick={onEdit} /> }
        </Box>
      ) }

    </Grid>
  );
};

export default ReactionHeader;
