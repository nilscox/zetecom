import React from 'react';

import Authenticated from 'src/components/Authenticated';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';

import AsyncContent from '../components/AsyncContent';
import Indented from '../components/Comment/CommentContainer/Indented';
import CommentsList from '../components/CommentsList';
import FiltersBar from '../components/FiltersBar';
import InformationOverview from '../components/InformationOverview';
import RouterLink from '../components/Link';
import Padding from '../components/Padding';
import { InformationProvider } from '../contexts/InformationContext';
import useAxiosPaginated from '../hooks/use-axios-paginated';
import { parseComment } from '../types/Comment';
import { Information, parseInformation } from '../types/Information';

import { Card, CardContent } from '@material-ui/core';

const useParseInformationForUser = () => {
  return (data: any) => ({
    information: parseInformation(data.information),
    comments: data.comments.map(parseComment),
  });
};

const UserCommentsInformation: React.FC<{ information: Information }> = ({ information }) => (
  <InformationProvider value={information}>

    <Card variant="outlined" elevation={2}>
      <CardContent>

        <InformationOverview
          title={<RouterLink to={`/information/${information.id}`}>{ information.title }</RouterLink>}
          information={information}
        />

        <Padding top>
          <Indented>
            <CommentsList comments={information.comments} />
          </Indented>
        </Padding>

      </CardContent>
    </Card>

  </InformationProvider>
);

const UserComments: React.FC = () => {
  const parseInformationForUser = useParseInformationForUser();
  const [
    { loading, data, total, error },
    { search, setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/comment/me', parseInformationForUser);

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

            {data.map(({ information, comments }, n) => (
              <Padding key={information.id} top>
                <UserCommentsInformation information={{ ...information, comments }} />
              </Padding>
            ))}

          </SearchQueryProvider>
        )}
      </AsyncContent>
    </Authenticated>
  );
};

export default UserComments;
