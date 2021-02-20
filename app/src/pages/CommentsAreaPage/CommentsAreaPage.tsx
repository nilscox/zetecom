/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { RouteComponentProps } from 'react-router';

import CommentsList from 'src/components/domain/Comment/CommentsList/CommentsList';
import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import CommentsAreaOutline from 'src/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import { useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { CommentsArea } from 'src/types/CommentsArea';

import useComments from './useComments';

const CommentsAreaPage: React.FC<RouteComponentProps<{ commentsAreaId: string }>> = ({ match }) => {
  const { commentsAreaId } = match.params;
  const user = useUser();

  const [commentsArea] = useAxios<CommentsArea>({
    url: `/api/comments-area/${commentsAreaId}`,
  });

  const [
    comments,
    { loading, total, submitting, onSubmit, page, setPage, sort, setSort, search, setSearch },
  ] = useComments(commentsAreaId);

  const handleSubmit = (text: string) => {
    onSubmit({ data: { text, commentsAreaId: commentsArea?.id } });
  };

  return (
    <Box mt={4}>
      {commentsArea && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}

      <Box my={4}>
        <FiltersBar
          page={page}
          totalPages={total}
          sort={sort}
          search={search}
          onPageChange={setPage}
          onSort={setSort}
          onSearch={setSearch}
          css={theme => ({ margin: `${theme.spacings[4]}px 0` })}
        />
      </Box>

      {user && (
        <Box mb={2}>
          <CommentForm
            type="root"
            author={user}
            placeholder="Composez votre message..."
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        </Box>
      )}

      <AsyncContent
        loading={loading}
        render={() => <CommentsList CommentContainer={CommentContainer} comments={comments ?? []} />}
      />
    </Box>
  );
};

export default CommentsAreaPage;
