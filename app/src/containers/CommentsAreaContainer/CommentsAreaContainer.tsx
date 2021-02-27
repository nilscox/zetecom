import React, { useState } from 'react';

import CommentsList from 'src/components/domain/Comment/CommentsList/CommentsList';
import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import CommentsAreaOutline from 'src/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import Fallback from 'src/components/layout/Fallback/Fallback';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import useCreateComment from 'src/containers/CommentsAreaContainer/hooks/useCreateComment';
import { CommentsAreaProvider } from 'src/contexts/commentsAreaContext';
import { useUser } from 'src/contexts/userContext';
import { SortType } from 'src/types/SortType';

import useComments from './hooks/useComments';
import useCommentsArea from './hooks/useCommentsArea';

type CommentsAreaContainerProps = {
  displayOutline?: boolean;
  commentsAreaId?: number;
  commentsAreaIdentifier?: string;
  notFoundFallback: React.ReactElement;
};

type NoCommentsFallbackProps = {
  isSearching: boolean;
};

const NoCommentsFallback: React.FC<NoCommentsFallbackProps> = ({ isSearching }) => {
  if (isSearching) {
    return <>Aucun résultat ne correspond à cette recherche.</>;
  }

  return <>Aucun commentaire n'a été publié pour le moment.</>;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({
  displayOutline,
  commentsAreaId,
  commentsAreaIdentifier,
  notFoundFallback,
}) => {
  const user = useUser();

  const { commentsArea, loadingCommentsArea, commentsAreaNotFound } = useCommentsArea(
    commentsAreaId,
    commentsAreaIdentifier,
  );

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SortType.DATE_DESC);
  const [search, setSearch] = useState('');

  const { loadingComments, totalComments, comments } = useComments(
    commentsAreaId ?? commentsArea?.id,
    page,
    sort,
    search,
  );

  const [createComment, { submittingRootComment }] = useCreateComment(commentsArea);

  if (commentsAreaNotFound) {
    return notFoundFallback;
  }

  return (
    <AsyncContent
      loading={loadingCommentsArea}
      render={() => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <CommentsAreaProvider value={commentsArea!}>
          {displayOutline && commentsArea && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}

          <Box my={4}>
            <FiltersBar
              page={page}
              total={totalComments}
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
                submitting={submittingRootComment}
                onSubmit={text => createComment({ text })}
              />
            </Box>
          )}

          <AsyncContent
            loading={loadingCommentsArea || loadingComments}
            render={() => (
              <Fallback
                when={totalComments === 0}
                fallback={<NoCommentsFallback isSearching={search !== ''} />}
                render={() => <CommentsList CommentContainer={CommentContainer} comments={comments ?? []} />}
              />
            )}
          />
        </CommentsAreaProvider>
      )}
    />
  );
};

export default CommentsAreaContainer;
