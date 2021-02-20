import React from 'react';

import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import CommentsAreaRequest from 'src/pages/CommentsAreasListPage/CommentsAreaRequest/CommentsAreaRequest';
import { CommentsArea } from 'src/types/CommentsArea';

import CommentsAreasList from './CommentsAreasList/CommentsAreasList';

const CommentsAreasListPage: React.FC = () => {
  const [commentsAreas, { loading, page, setPage, search, setSearch }] = useAxiosPaginated<CommentsArea>(
    '/api/comments-area',
  );

  return (
    <>
      <Box my={4}>
        <FiltersBar
          page={page}
          totalPages={commentsAreas?.total}
          search={search}
          onPageChange={setPage}
          onSearch={setSearch}
        />
      </Box>

      <CommentsAreaRequest />

      <AsyncContent loading={loading} render={() => <CommentsAreasList commentsAreas={commentsAreas?.items || []} />} />
    </>
  );
};

export default CommentsAreasListPage;
