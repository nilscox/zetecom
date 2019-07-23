import React from 'react';

import { Subject } from 'src/types/Subject';
import UserAvatar from 'src/components/UserAvatar';
import Flex from 'src/components/Flex';
import Box from 'src/components/Box';

export type SubjectsListDisplayMode = 'COMPACT' | 'FULL';

type SubjectHeaderProps = {
  subject: Subject,
};

const SubjectHeader: React.FC<SubjectHeaderProps> = ({ subject }) => (
  <Box p={5}>
    <Flex flexDirection="row" alignItems="center">
      <UserAvatar user={subject.author} />
      <Box ml={10}>{ subject.author.nick }</Box>
    </Flex>
  </Box>
);

type SubjectBodyProps = {
  subject: Subject,
};

const SubjectBody: React.FC<SubjectBodyProps> = ({ subject }) => (
  <>
    { subject.text }
  </>
);

type SubjectProps = {
  display: SubjectsListDisplayMode,
  subject: Subject,
};

const Subject: React.FC<SubjectProps> = ({ display, subject }) => (
  <Box border="1px solid #CCC" borderRadius={2}>
    <SubjectHeader subject={subject} />
    { display === 'FULL' && <SubjectBody subject={subject} /> }
  </Box>
);

type SubjectsListProps = {
  display: SubjectsListDisplayMode,
  subjects: Subject[],
};

export const SubjectsList: React.FC<SubjectsListProps> = ({ display, subjects }) => (
  <>
    {subjects.map(subject => (
      <div key={subject.id}>
        <Subject display={display} subject={subject} />
      </div>
    ))}
  </>
);
