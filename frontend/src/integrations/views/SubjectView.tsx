import React, { useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { fetchReactions } from 'src/api/subjects';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Hr from 'src/components/common/Hr';
import Break from 'src/components/common/Break';
import Loader from 'src/components/common/Loader';
import Button from 'src/components/common/Button';
import Text from 'src/components/common/Text';
import SortSelect from 'src/components/common/SortSelect';

import SubjectComponent from 'src/components/subject/Subject';
import ReactionsList from 'src/components/reaction/ReactionsList';

const useReactions = (subject: Subject, sort: SortType) => {
  const [reactions, setReactions] = useState<Reaction[] | undefined>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);

    fetchReactions(subject.id, sort)
      .then(reactions => {
        setReactions(reactions);
        setFetching(false);
      });
  }, [subject, sort]);

  return {
    fetchingReactions: fetching,
    reactions,
  };
};

type SubjectViewProps = {
  subject: Subject;
  backToSubjectsList: () => void;
};

const SubjectView: React.FC<SubjectViewProps> = ({ subject, backToSubjectsList }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const { sizes: { big }, colors: { border }, borderRadius } = useTheme();
  const { fetchingReactions, reactions } = useReactions(subject, SortType.DATE_ASC);

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">
        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!reactions || true} onChange={(sort) => setSort(sort)} />
        </Box>
        <div style={{ flex: 1 }}>
          <Button align="right" onClick={backToSubjectsList}>Retour</Button>
        </div>
      </Flex>

      <Box border={`1px solid ${border}`} borderRadius={borderRadius}>
        <SubjectComponent subject={subject} />
      </Box>

      <Break size={big} />
      <Hr />
      <Break size={big} />

      { fetchingReactions ? <Loader size="big" /> : <ReactionsList reactions={reactions} /> }

    </>
  );
};

export default SubjectView;
