import React, { useContext } from 'react';
import moment from 'moment';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import UserContext from 'src/utils/UserContext';
import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] hh:mm';

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
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, date, edited, onEdit }) => {
  const { sizes: { small, medium }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();
  const { user } = useContext(UserContext);

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

      <Box pt={small} pr={medium} style={{ position: 'absolute', top: 0, right: 0, lineHeight: '15px' }}>
        { !edited ? (
          <Text variant="note">{ moment(date).format(DATE_FORMAT) }</Text>
        ) : (
          <Text variant="note" style={{ fontStyle: 'oblique' }}>* { moment(edited).format(DATE_FORMAT) }</Text>
        ) }
      </Box>

      <Box pt={small} pr={medium} style={{ position: 'absolute', bottom: 0, right: 0 }}>
        { author.id === user.id && <EditButton onClick={onEdit} /> }
      </Box>

    </div>
  );
};

export default ReactionHeader;
