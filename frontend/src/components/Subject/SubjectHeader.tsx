import React, { useState } from 'react';
import moment from 'moment';

import { UserLight } from 'src/types/User';
import { Subject } from 'src/types/Subject';
import { Theme, useTheme } from 'src/utils/Theme';

import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';
import UserAvatar from '../UserAvatar';

type SubjectHeaderProps = {
  subject: Subject;
  transparent?: boolean;
  onClick?: () => void;
};

const SubjectHeader: React.FC<SubjectHeaderProps> = ({ subject: { subject, author, date }, transparent, onClick }) => {
  const [hover, setHover] = useState(false);
  const {
    sizes: { medium, big },
    colors,
    borderRadius,
  } = useTheme();

  return (
    <Flex
      py={medium}
      px={big}
      flexDirection="row"
      alignItems="center"
      borderRadius={borderRadius}
      style={{
        backgroundColor: (!transparent || hover) && colors.backgroundLight,
        borderBottom: `1px solid ${colors.borderLight}`,
        cursor: onClick && 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >

      <div style={{ maxWidth: '100%' }}>
        <Text oneline variant="subject-title">{ subject }</Text>
        <Text variant="note">Par <b>{ author.nick }</b>, le { moment(date).format('DD.MM.YYYY') }</Text>
      </div>

    </Flex>
  );
};

export default SubjectHeader;
