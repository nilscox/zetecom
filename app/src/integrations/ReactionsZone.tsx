import React from 'react';

import AsyncContent from 'src/components/common/AsyncContent';
import CenteredContent from 'src/components/common/CenteredContent';
import PaginatedList from 'src/components/common/PaginatedList';
import Text from 'src/components/common/Text';
import ReactionCreationForm from 'src/components/reaction/ReactionForm/ReactionCreationForm';
import ReactionsList from 'src/components/reaction/ReactionsList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { useCurrentUser } from 'src/hooks/use-user';
import { parseReaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { useInformation } from 'src/utils/InformationContext';
import { SearchQueryProvider } from 'src/utils/SearchQueryContext';

import Padding from '../components/common/Padding';

const ReactionsZone: React.FC = () => {
  const user = useCurrentUser();
  const information = useInformation();

  const [
    { loading, data, total },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${information.id}/reactions`, parseReaction);

  const [reactions, { prepend }] = useEditableDataset(data);

  const getReactionsList = () => {
    if (!reactions.length) {
      return (
        <CenteredContent>
          <Text uppercase color="textLight">
            { !search && <>Aucune réaction n'a été publiée pour le moment.</> }
            { search && !loading && <>Aucun résultat ne correspond à cette recherche</> }
          </Text>
        </CenteredContent>
      );
    }

    return <ReactionsList reactions={reactions} />;
  };

  return (
    <PaginatedList
      sort={{ type: sort || SortType.DATE_DESC, onChange: setSort }}
      onSearch={setSearch}
      page={page}
      pageSize={10}
      total={total}
      onPageChange={setPage}
    >

      { user && (
        <Padding y>
          <ReactionCreationForm onCreated={reaction => prepend(reaction)} />
        </Padding>
      ) }

      <SearchQueryProvider value={search || undefined}>
        <AsyncContent loading={loading || !reactions} content={getReactionsList} />
      </SearchQueryProvider>

    </PaginatedList>
  );
};

export default ReactionsZone;
