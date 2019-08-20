import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useCurrentUser } from 'src/utils/UserContext';
import { SortType } from 'src/types/SortType';
import { useSubject, useRootReactions } from 'src/api/subjects';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Hr from 'src/components/common/Hr';
import Break from 'src/components/common/Break';
import Loader from 'src/components/common/Loader';
import Link from 'src/components/common/Link';
import Text from 'src/components/common/Text';
import SortSelect from 'src/components/common/SortSelect';

import SubjectComponent from 'src/components/subject/Subject';
import ReactionsList from 'src/components/reaction/ReactionsList';
import ReactionForm from 'src/components/reaction/ReactionForm';

type SubjectViewProps = RouteComponentProps<{ id: string }>;

const SubjectView: React.FC<SubjectViewProps> = ({ match }) => {
  const user = useCurrentUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const { sizes: { big }, colors: { border }, borderRadius } = useTheme();
  const [subject, { loading: fetchingSubject, error: fetchSubjectError }] = useSubject(match.params.id);

  const [
    reactions,
    { loading: fetchingRootReactions, error: fetchRootReactionsError },
    { onCreated: onReactionCreated, onEdited: onReactionEdited },
  ] = useRootReactions(match.params.id, SortType.DATE_ASC);

  if (!fetchingSubject && fetchSubjectError)
    throw fetchSubjectError;
  if (!fetchingRootReactions && fetchRootReactionsError)
    throw fetchRootReactionsError;

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

  if (fetchingSubject)
    return <Loader size="big" />;

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">
        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!reactions || true} onChange={(sort) => setSort(sort)} />
        </Box>
        <Flex flex={1} flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Link to="/">Retour</Link>
        </Flex>
      </Flex>

      <Box border={`1px solid ${border}`} borderRadius={borderRadius}>
        <SubjectComponent displayReactionsLink={false} subject={subject} />
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

      { fetchingRootReactions ? <Loader size="big" /> : getReactionsList() }

    </>
  );
};

export default SubjectView;
