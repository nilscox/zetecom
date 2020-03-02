import React from 'react';

import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import PaginatedList from 'src/components/common/PaginatedList';
import Text from 'src/components/common/Text';
import ReactionCreationForm from 'src/components/reaction/ReactionForm';
import ReactionsList from 'src/components/reaction/ReactionsList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { useCurrentUser } from 'src/hooks/use-user';
import { parseReaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { useInformation } from 'src/utils/InformationContext';

const StandaloneReactionsPage: React.FC = () => {
  const user = useCurrentUser();
  const information = useInformation();

  const [
    { loading, data, totalPages },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${information.id}/reactions`, parseReaction);

  const [reactions, { prepend, replace }] = useEditableDataset(data);

  const getReactionsList = () => {
    if (!reactions.length) {
      return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
          <Text uppercase color="textLight">
            { !search && <>Aucne réaction n'a été publiée pour le moment.</> }
            { search && !loading && <>Aucun résultat ne correspond à cette recherche</> }
          </Text>
        </Flex>
      );
    }

    return <ReactionsList reactions={reactions} onEdited={replace} />;
  };

  return (
    <PaginatedList
      sort={{
        type: sort || SortType.DATE_DESC,
        onChange: setSort,
      }}
      onSearch={setSearch}
      page={page}
      pageSize={10}
      totalPages={totalPages}
      onPageChange={setPage}
    >

      { user && <ReactionCreationForm onCreated={reaction => prepend(reaction)} /> }

      { loading || !reactions ? <Loader /> : getReactionsList() }

    </PaginatedList>
  );
};

export default StandaloneReactionsPage;
