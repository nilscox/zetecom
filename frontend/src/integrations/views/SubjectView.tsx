import React, { useState } from 'react';

import { useCurrentUser } from 'src/utils/UserContext';
import { Subject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
import { useRootReactions } from 'src/api/subjects';
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
import ReactionForm from 'src/components/reaction/ReactionForm';

type SubjectViewProps = {
  subject: Subject;
  backToSubjectsList: () => void;
};

const SubjectView: React.FC<SubjectViewProps> = ({ subject, backToSubjectsList }) => {
  const user = useCurrentUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const { sizes: { big }, colors: { border }, borderRadius } = useTheme();

  const [
    reactions,
    { loading: fetchingReactions, error },
    { onCreated: onReactionCreated, onEdited: onReactionEdited },
  ] = useRootReactions(subject, SortType.DATE_ASC);

  const getReactionsList = () => {
    if (!reactions.length) {
      if (user)
        return null;

      return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 60 }}>
          <Text uppercase color="textLight">Il n'y a pas encore de réaction. Connectez-vous pour réagir !</Text>
        </Flex>
      );
    }

    return (
      <ReactionsList
        subject={subject}
        reactions={reactions}
        onEdited={onReactionEdited}
      />
    );
  };

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">
        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!reactions || true} onChange={(sort) => setSort(sort)} />
        </Box>
        <Flex flex={1} flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Button onClick={backToSubjectsList}>Retour</Button>
        </Flex>
      </Flex>

      <Box border={`1px solid ${border}`} borderRadius={borderRadius}>
        <SubjectComponent subject={subject} />
      </Box>

      <Break size={big} />
      <Hr />
      <Break size={big} />

      { user && (
        <>
          <ReactionForm subject={subject} onCreated={onReactionCreated} />
          <Break size={big} />
        </>
      ) }

      { fetchingReactions ? <Loader size="big" /> : getReactionsList() }

    </>
  );
};

export default SubjectView;
