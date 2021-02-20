/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { RouteComponentProps } from 'react-router';

import CommentsList from 'src/components/domain/Comment/CommentsList/CommentsList';
import CommentsAreaOutline from 'src/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import { Comment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';

const CommentsAreaPage: React.FC<RouteComponentProps<{ commentsAreaId: string }>> = ({ match }) => {
  const { commentsAreaId } = match.params;

  const [commentsArea] = useAxios<CommentsArea>({
    url: `/api/comments-area/${commentsAreaId}`,
  });

  const [comments, { loading, page, setPage, sort, setSort, search, setSearch }] = useAxiosPaginated<Comment>({
    url: '/api/comment',
    params: { commentsAreaId },
  });

  return (
    <Box mt={4}>
      {commentsArea && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}

      <Box my={4}>
        <FiltersBar
          page={page}
          totalPages={comments?.total}
          sort={sort}
          search={search}
          onPageChange={setPage}
          onSort={setSort}
          onSearch={setSearch}
          css={theme => ({ margin: `${theme.spacings[4]}px 0` })}
        />
      </Box>

      <AsyncContent
        loading={loading}
        render={() => <CommentsList CommentContainer={CommentContainer} comments={comments?.items ?? []} />}
      />
    </Box>
  );
};
export default CommentsAreaPage;
