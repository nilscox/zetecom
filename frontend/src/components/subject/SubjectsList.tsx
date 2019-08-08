import React, { useState } from 'react';

import { Subject } from 'src/types/Subject';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Break from 'src/components/common/Break';

import SubjectComponent from './Subject';
import SubjectHeader from './SubjectHeader';

type ClosedSubjectsListProps = {
  subjects: Subject[];
  setOpen: (id: number) => void;
};

function isLast<T>(arr: T[], n: number) {
  return n === arr.length - 1;
}

const ClosedSubjectsList: React.FC<ClosedSubjectsListProps> = ({ subjects, setOpen }) => {
  const { colors, borderRadius } = useTheme();

  return (
    <Box border={`1px solid ${colors.border}`} borderRadius={borderRadius}>
      {subjects.map(subject => (
        <div key={subject.id}>
          <SubjectHeader transparent subject={subject} onClick={() => setOpen(subject.id)} />
        </div>
      ))}
    </Box>
  );
};

type SubjectsListProps = {
  subjects: Subject[];
  setSubject: (subject: Subject) => void;
};

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects, setSubject }) => {
  const [open, setOpen] = useState<number | null>(null);
  const { sizes: { big }, colors, borderRadius } = useTheme();
  const openIdx = subjects.findIndex(s => s.id === open);

  if (open === null)
    return <ClosedSubjectsList subjects={subjects} setOpen={setOpen} />;

  return (
    <>
      { (
        <>
          <ClosedSubjectsList subjects={subjects.slice(0, openIdx)} setOpen={setOpen} />
          <Break size={big} />
        </>
      ) }

      <Box border={`1px solid ${colors.border}`} borderRadius={borderRadius}>
        <SubjectComponent
          subject={subjects[openIdx]}
          onHeaderClick={() => setOpen(null)}
          onViewReactions={() => setSubject(subjects[openIdx])}
        />
      </Box>

      { !isLast(subjects, openIdx) && (
        <>
          <Break size={big} />
          <ClosedSubjectsList subjects={subjects.slice(openIdx + 1)} setOpen={setOpen} />
        </>
      ) }
    </>
  );
};

export default SubjectsList;
