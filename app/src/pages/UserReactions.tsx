import React from 'react';

import Authenticated from 'src/components/Authenticated';

import AsyncContent from '../components/AsyncContent';
import FiltersBar from '../components/FiltersBar';
import InformationOverview from '../components/InformationOverview';
import RouterLink from '../components/Link';
import Padding from '../components/Padding';
import Indented from '../components/Reaction/ReactionContainer/Indented';
import ReactionsList from '../components/ReactionsList';
import { InformationProvider } from '../contexts/InformationContext';
import { useCurrentUser } from '../contexts/UserContext';
import useAxiosPaginated from '../hooks/use-axios-paginated';
import { Information, parseInformation } from '../types/Information';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';

const useParseInformationForUser = () => {
  const user = useCurrentUser();

  return (data: any) => {
    const information = parseInformation(data);

    information.reactions.forEach(reaction => reaction.author = user);

    return information;
  };
};

const UserReactionsInformation: React.FC<{ information: Information }> = ({ information }) => (
  <InformationProvider value={information}>

    <Padding y>
      <InformationOverview
        title={<RouterLink to={`/information/${information.id}`}>{ information.title }</RouterLink>}
        information={information}
      />
    </Padding>

    <Indented>
      <ReactionsList reactions={information.reactions} />
    </Indented>

  </InformationProvider>
);

const UserReactions: React.FC = () => {
  const parseInformationForUser = useParseInformationForUser();
  const [
    { loading, data: informations, total, error },
    { search, setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/reaction/me', parseInformationForUser);

  if (error)
    throw error;

  return (
    <Authenticated>
      <AsyncContent loading={loading}>
        {() => (
          <SearchQueryProvider value={search}>

            <FiltersBar
              onSearch={setSearch}
              page={page}
              pageSize={10}
              total={total}
              onPageChange={setPage}
            />

            {informations.map((information, n) => (
              <Padding key={information.id} top when={n > 0}>
                <UserReactionsInformation information={information} />
              </Padding>
            ))}

          </SearchQueryProvider>
        )}
      </AsyncContent>
    </Authenticated>
  );
};

export default UserReactions;
