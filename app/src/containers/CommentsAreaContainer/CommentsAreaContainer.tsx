import React, { useState } from 'react';

import { Redirect, useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce/lib';

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
import { SearchQueryProvider } from 'src/contexts/searchQueryContext';
import { useUser } from 'src/contexts/userContext';
import useQueryString from 'src/hooks/use-query-string';
import { CommentsArea } from 'src/types/CommentsArea';
import { SortType } from 'src/types/SortType';

import PinnedCommentContainer from '../PinnedCommentContainer/PinnedCommentContainer';

import useComments from './hooks/useComments';
import useCommentsArea from './hooks/useCommentsArea';

type NoCommentsFallbackProps = {
  isSearching: boolean;
};

const NoCommentsFallback: React.FC<NoCommentsFallbackProps> = ({ isSearching }) => {
  if (isSearching) {
    return <>Aucun résultat ne correspond à cette recherche.</>;
  }

  return <>Aucun commentaire n'a été publié pour le moment.</>;
};

type CommentsAreaContentProps = {
  commentsArea: CommentsArea;
};

const CommentsAreaContent: React.FC<CommentsAreaContentProps> = ({ commentsArea }) => {
  const user = useUser();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SortType.DATE_DESC);
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  const { loadingComments, totalComments, comments } = useComments(commentsArea?.id, page, sort, searchDebounced);

  const [createComment, { submittingRootComment }] = useCreateComment(commentsArea);

  const isSearching = searchDebounced !== '';

  return (
    <>
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
            onSubmit={(text) => createComment({ text })}
          />
        </Box>
      )}

      <AsyncContent
        loading={loadingComments}
        render={() => (
          <Fallback
            when={totalComments === 0}
            fallback={<NoCommentsFallback isSearching={isSearching} />}
            render={() => (
              <SearchQueryProvider value={isSearching ? searchDebounced : undefined}>
                <CommentsList CommentContainer={CommentContainer} comments={comments ?? []} />
              </SearchQueryProvider>
            )}
          />
        )}
      />
    </>
  );
};

type CommentsAreaContainerProps = {
  displayOutline?: boolean;
  commentsAreaId?: number;
  commentsAreaIdentifier?: string;
  notFoundFallback: React.ReactElement;
  onCommentsAreaLoaded?: (commentsArea: CommentsArea) => void;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({
  displayOutline,
  commentsAreaId,
  commentsAreaIdentifier,
  notFoundFallback,
  onCommentsAreaLoaded,
}) => {
  const { pin } = useQueryString();
  const location = useLocation();
  const pinCommentId = typeof pin === 'string' ? Number(pin) : undefined;

  const { commentsArea, loadingCommentsArea, commentsAreaNotFound } = useCommentsArea(
    commentsAreaId,
    commentsAreaIdentifier,
    onCommentsAreaLoaded,
  );

  if (pinCommentId !== undefined && isNaN(pinCommentId)) {
    return <Redirect to={{ pathname: location.pathname, search: '' }} />;
  }

  if (commentsAreaNotFound) {
    return notFoundFallback;
  }

  return (
    <AsyncContent
      loading={loadingCommentsArea}
      render={() =>
        commentsArea && (
          <CommentsAreaProvider value={commentsArea}>
            {displayOutline && commentsArea && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}
            {pinCommentId ? (
              <PinnedCommentContainer commentsAreaId={commentsArea.id} commentId={pinCommentId} />
            ) : (
              <CommentsAreaContent commentsArea={commentsArea} />
            )}
          </CommentsAreaProvider>
        )
      }
    />
  );
};

export default CommentsAreaContainer;
