import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { parseReaction, Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { useTheme } from 'src/utils/Theme';
import { useCurrentUser } from 'src/utils/UserContext';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Hr from 'src/components/common/Hr';
import Break from 'src/components/common/Break';
import Loader from 'src/components/common/Loader';
import Text from 'src/components/common/Text';
import SortSelect from 'src/components/common/SortSelect';

import SubjectComponent from 'src/components/subject/Subject';
import ReactionsList from 'src/components/reaction/ReactionsList';
import ReactionForm from 'src/components/reaction/ReactionForm';

import useAxios, { ResponseData } from 'src/hooks/use-axios';
import { parseSubject } from 'src/types/Subject';

const useRootReactions = (subjectId: string, sort: SortType) => {
  const url = `/api/subject/${subjectId}/reactions` + (sort ? `?sort=${sort}` : '');
  const parse = useCallback((data: ResponseData) => data.map(parseReaction), []);

  const [{ data, loading, error, status }] = useAxios({ url }, parse);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (status(200))
      setReactions(data);
  }, [status, data]);

  const onCreated = (reaction: Reaction) => {
    setReactions([
      reaction,
      ...reactions,
    ]);
  };

  const onEdited = (reaction: Reaction) => {
    const idx = reactions.findIndex((r: Reaction) => r.id === reaction.id);

    if (idx < 0)
      return;

    setReactions([
      ...reactions.slice(0, idx),
      reaction,
      ...reactions.slice(idx + 1)]);
  };

  return [
    { reactions, loading, error },
    { onCreated, onEdited },
  ] as const;
};

type SubjectPageProps = RouteComponentProps<{ id: string }>;

const SubjectPage: React.FC<SubjectPageProps> = ({ match }) => {
  const user = useCurrentUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const { sizes: { big }, colors: { border }, borderRadius } = useTheme();

  const [{
    data: subject,
    loading: loadingSubject,
    error: subjectError,
  }] = useAxios('/api/subject/' + match.params.id, parseSubject);

  const [
    { reactions, loading: loadingRootReactions, error: rootReactionsError },
    { onCreated: onReactionCreated, onEdited: onReactionEdited },
  ] = useRootReactions(match.params.id, SortType.DATE_ASC);

  if (subjectError)
    throw subjectError;

  if (rootReactionsError)
    throw rootReactionsError;

  const getReactionsList = () => {
    if (!reactions.length) {
      if (user)
        return null;

      return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 60 }}>
          <Text uppercase color="textLight">
            Il n'y a pas encore de réaction à ce sujet. Connectez-vous pour réagir !
          </Text>
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

  if (loadingSubject)
    return <Loader size="big" />;

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">
        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!reactions || true} onChange={(sort) => setSort(sort)} />
        </Box>
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

      { loadingRootReactions ? <Loader size="big" /> : getReactionsList() }

    </>
  );
};

export default SubjectPage;
