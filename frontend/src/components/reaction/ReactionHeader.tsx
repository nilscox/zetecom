import React from 'react';
import moment from 'moment';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import UserAvatar from 'src/components/common/UserAvatar';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] hh:mm';

type ReactionHeaderProps = {
  author: Reaction['author'];
  date: Reaction['date'];
  edited: Reaction['edited'];
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, date, edited }) => {
  const { sizes: { small, medium, big }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();

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
      <Flex flexDirection="row" alignItems="center">
        <UserAvatar user={author} />
        <Box ml={big}>
          <Text size="big" style={{ fontWeight: 'bold' }}>{ author.nick }</Text>
        </Box>
      </Flex>
      <Box pt={small} pr={medium} style={{ position: 'absolute', top: 0, right: 0 }}>
        { !edited ? (
          <Text variant="note">{ moment(date).format(DATE_FORMAT) }</Text>
        ) : (
          <Text variant="note" style={{ fontStyle: 'oblique' }}>* { moment(edited).format(DATE_FORMAT) }</Text>
        ) }
      </Box>
    </div>
  );
};

export default ReactionHeader;
