import React from 'react';

import CommentsList from 'src/components/domain/Comment/CommentsList/CommentsList';
import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import CommentsAreaOutline from 'src/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import { CommentsAreaProvider } from 'src/contexts/commentsAreaContext';
import { useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { CommentsArea } from 'src/types/CommentsArea';

import useComments from './hooks/useComments';

type CommentsAreaContainerProps = {
  displayOutline?: boolean;
  commentsAreaId: number;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({ displayOutline, commentsAreaId }) => {
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
    <CommentsAreaProvider value={commentsArea}>
      {displayOutline && commentsArea && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}

      <Box my={4}>
        <FiltersBar
          page={page}
          totalPages={total}
          sort={sort}
          search={search}
          onPageChange={setPage}
          onSort={setSort}
          onSearch={setSearch}
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
    </CommentsAreaProvider>
  );
};

export default CommentsAreaContainer;
