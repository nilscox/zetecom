import React from 'react';

import AsyncContent from 'src/components/common/AsyncContent';
import CenteredContent from 'src/components/common/CenteredContent';
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
import { useTheme } from 'src/utils/Theme';

const StandaloneReactionsPage: React.FC = () => {
  const user = useCurrentUser();
  const information = useInformation();
  const { sizes: { big } } = useTheme();

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
        <CenteredContent>
          <Text uppercase color="textLight">
            { !search && <>Aucune réaction n'a été publiée pour le moment.</> }
            { search && !loading && <>Aucun résultat ne correspond à cette recherche</> }
          </Text>
        </CenteredContent>
      );
    }

    return <ReactionsList style={{ paddingTop: big }} reactions={reactions} onEdited={replace} />;
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

      <AsyncContent loading={loading || !reactions} content={getReactionsList} />

    </PaginatedList>
  );
};

export default StandaloneReactionsPage;
