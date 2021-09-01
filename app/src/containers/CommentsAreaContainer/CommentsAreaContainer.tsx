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
  displayOutline?: boolean;
};

const CommentsAreaContent: React.FC<CommentsAreaContentProps> = ({ commentsArea, displayOutline }) => {
  const user = useUser();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SortType.DATE_DESC);
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  const { loadingComments, totalComments, comments } = useComments(commentsArea, page, sort, searchDebounced);

  const [createComment, { submittingRootComment }] = useCreateComment(commentsArea);

  const isSearching = searchDebounced !== '';

  return (
    <>
      {displayOutline && <CommentsAreaOutline commentsArea={commentsArea} link="external" />}

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

      {commentsArea.status === 'REQUESTED' && (
        <Box my={4}>
          Cette zone de commentaires est en attente de modération, les commentaires présents sur cette page ne sont pas
          encore visible de tous les utilisateurs.
        </Box>
      )}

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
  commentsAreaId: number;
  displayOutline?: boolean;
  NotFoundFallback?: React.FC;
};

const CommentsAreaContainer: React.FC<CommentsAreaContainerProps> = ({
  commentsAreaId,
  displayOutline,
  NotFoundFallback,
}) => {
  const { pin } = useQueryString();
  const location = useLocation();
  const pinCommentId = typeof pin === 'string' ? Number(pin) : undefined;

  const { commentsArea, loadingCommentsArea, notFound } = useCommentsArea(commentsAreaId);

  if (pinCommentId !== undefined && isNaN(pinCommentId)) {
    return <Redirect to={{ pathname: location.pathname, search: '' }} />;
  }

  const render = () => {
    if (!commentsArea) {
      return null;
    }

    return (
      <CommentsAreaProvider value={commentsArea}>
        {pinCommentId && <PinnedCommentContainer commentsAreaId={commentsArea.id} commentId={pinCommentId} />}
        {!pinCommentId && <CommentsAreaContent displayOutline={displayOutline} commentsArea={commentsArea} />}
      </CommentsAreaProvider>
    );
  };

  if (notFound && NotFoundFallback) {
    return <NotFoundFallback />;
  }

  return <AsyncContent loading={loadingCommentsArea} render={render} />;
};

export default CommentsAreaContainer;
