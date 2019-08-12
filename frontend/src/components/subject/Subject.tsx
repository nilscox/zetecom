import React from 'react';

import { Subject } from 'src/types/Subject';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Button from 'src/components/common/Button';
import Text from 'src/components/common/Text';
import MarkdownMessage from 'src/components/common/MarkdownMessage';

import SubjectHeader from './SubjectHeader';

const SubjectQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    m={15}
    mb={0}
    style={{
      backgroundImage: 'url(/assets/images/quotation-mark.png)',
      backgroundPosition: 'top 0 left 30px',
      backgroundRepeat: 'no-repeat',
      minHeight: 50,
      fontSize: '1.1em',
      textIndent: 30,
    }}
  >
    <Text bold color="textLight">{ children }</Text>
  </Box>
);

const ViewReactions: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { sizes: { medium } } = useTheme();

  return (
    <Flex my={medium} flexDirection="row" justifyContent="center">
      <Button onClick={onClick}>
        Voir les réactions
      </Button>
    </Flex>
  );
};

type SubjectProps = {
  subject: Subject;
  onHeaderClick?: () => void;
  onViewReactions?: () => void;
};

const SubjectComponent: React.FC<SubjectProps> = ({ subject, onHeaderClick, onViewReactions }) => (
  <>

    <SubjectHeader subject={subject} onClick={onHeaderClick} onViewReactions={onViewReactions} />
    { subject.quote && <SubjectQuote>{ subject.quote }</SubjectQuote> }
    <MarkdownMessage markdown={subject.text} />
    { onViewReactions && <ViewReactions onClick={onViewReactions} /> }

  </>
);

export default SubjectComponent;
