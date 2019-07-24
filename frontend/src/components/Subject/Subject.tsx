import React from 'react';

import { Subject } from 'src/types/Subject';
import { useTheme } from 'src/utils/Theme';

import UserAvatar from '../UserAvatar';
import Flex from '../Flex';
import Box from '../Box';
import Text from '../Text';
import MessageBody from '../MessageBody';

import SubjectHeader from './SubjectHeader';

type SubjectProps = {
  subject: Subject,
  onHeaderClick?: () => void;
  onViewReactions?: () => void;
};

const ViewReactions: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { sizes: { medium }, colors } = useTheme();

  return (
    <Box my={medium}>
      <Text variant="button" align="center" onClick={onClick}>
        Voir les réactions
      </Text>
    </Box>
  );
};

const Subject: React.FC<SubjectProps> = ({ subject, onHeaderClick, onViewReactions }) => (
  <>

    <SubjectHeader subject={subject} onClick={onHeaderClick} />
    <MessageBody markdown={subject.text} />
    { onViewReactions && <ViewReactions onClick={onViewReactions} /> }

  </>
);

export default Subject;
