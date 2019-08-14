import React, { useState } from 'react';
import moment from 'moment';

import { Reaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Button from 'src/components/common/Button';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] hh:mm';

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
      text={{ style: { fontSize: '11px' } }}
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

type ReactionHeaderProps = {
  author: Reaction['author'];
  date: Reaction['date'];
  edited: Reaction['edited'];
  onEdit: () => void;
  onReport: () => void;
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, date, edited, onEdit, onReport }) => {
  const { sizes: { small, medium }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();
  const [displayReportButton, setDisplayReportButton] = useState(false);
  const [showReportButton, hideReportButton] = [true, false].map(v => () => setDisplayReportButton(v));
  const user = useCurrentUser();

  return (
    <div
      style={{
        background: backgroundLight,
        borderBottom: `1px solid ${borderLight}`,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        padding: medium,
        position: 'relative',
      }}
    >

      <UserAvatarNick user={author} />

      <Flex
        flexDirection="row"
        pt={small}
        pr={medium}
        style={{ position: 'absolute', top: 0, right: 0, lineHeight: '15px' }}
        onMouseEnter={showReportButton}
        onMouseLeave={hideReportButton}
      >

        <ReportButton show={displayReportButton} onClick={onReport} />

        { !edited ? (
          <Text variant="note">{ moment(date).format(DATE_FORMAT) }</Text>
        ) : (
          <Text variant="note" style={{ fontStyle: 'oblique' }}>* { moment(edited).format(DATE_FORMAT) }</Text>
        ) }

      </Flex>

      <Box pt={small} pr={medium} style={{ position: 'absolute', bottom: 0, right: 0 }}>
        { user && user.id === author.id && <EditButton onClick={onEdit} /> }
      </Box>

    </div>
  );
};

export default ReactionHeader;
