import React from 'react';

import { Subject } from 'src/types/Subject';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import Link from 'src/components/common/Link';
import MarkdownMessage from 'src/components/common/MarkdownMessage';

import SubjectHeader from './SubjectHeader';

const SubjectQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    className="subject-quote"
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

const ViewReactionsLink: React.FC<{ subjectId: number }> = ({ subjectId }) => {
  const { sizes: { medium } } = useTheme();

  return (
    <Flex my={medium} flexDirection="row" justifyContent="center">
      <Link to={`/subject/${subjectId}`}>
        Voir les réactions
      </Link>
    </Flex>
  );
};

type SubjectProps = {
  subject: Subject;
  displayReactionsLink: boolean;
  onHeaderClick?: () => void;
};

const SubjectComponent: React.FC<SubjectProps> = ({ subject, displayReactionsLink, onHeaderClick }) => (
  <div className="subject" id={`subject-${subject.id}`}>

    <SubjectHeader subject={subject} onClick={onHeaderClick} />
    { subject.quote && <SubjectQuote>{ subject.quote }</SubjectQuote> }
    <MarkdownMessage className="subject-description" markdown={subject.text} />
    { displayReactionsLink && <ViewReactionsLink subjectId={subject.id} /> }

  </div>
);

export default SubjectComponent;
