import React, { useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import { QueryFunction, useQuery } from 'react-query';
import { useDebounce } from 'use-debounce/lib';

import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentsAreaRequest from 'src/pages/CommentsAreasListPage/CommentsAreaRequest/CommentsAreaRequest';
import { CommentsArea } from 'src/types/CommentsArea';
import { Paginated } from 'src/types/Paginated';

import CommentsAreasList from './CommentsAreasList/CommentsAreasList';

const fetchCommentsAreas: QueryFunction<Paginated<CommentsArea>> = async ({ queryKey: [, { page, search }] }) => {
  const params: AxiosRequestConfig['params'] = {};

  if (page !== 1) {
    params.page = page;
  }

  if (search !== '') {
    params.search = search;
  }

  const response = await axios.get<Paginated<CommentsArea>>('/api/comments-area', { params });

  return response.data;
};

const CommentsAreasListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  const { data: commentsAreas, isLoading: loading } = useQuery(
    ['commentsAreas', { page, search: searchDebounced }],
    fetchCommentsAreas,
  );

  return (
    <>
      <Box my={4}>
        <FiltersBar
          page={page}
          total={commentsAreas?.total}
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
