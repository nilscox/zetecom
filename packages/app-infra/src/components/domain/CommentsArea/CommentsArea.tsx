import React, { useState } from 'react';

import {
  createRootComment,
  firstCommentsPage,
  lastCommentsPage,
  nextCommentsPage,
  previousCommentsPage,
  searchComments,
  selectCanNavigateToNextCommentsPages,
  selectCanNavigateToPreviousCommentsPages,
  selectCommentsArea,
  selectCommentsPage,
  selectCommentsPagesCount,
  selectCommentsSort,
  selectCurrentCommentsArea,
  selectIsFetchingComments,
  selectIsSubmittingRootComment,
  sortComments,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { FiltersBar } from '~/components/elements/FiltersBar/FiltersBar';
import { Async } from '~/components/layout/Async/Async';
import { Box } from '~/components/layout/Box/Box';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { useAppSelector } from '~/hooks/useAppSelector';
import useUpdateEffect from '~/hooks/useUpdateEffect';
import { check } from '~/utils/check';

import { CommentsList } from '../Comment/Comment';
import { CommentForm } from '../CommentForm/CommentForm';

type CommentsAreaProps = {
  commentsAreaId: string;
};

export const CommentsArea: React.FC<CommentsAreaProps> = ({ commentsAreaId }) => {
  const dispatch = useDispatch();

  const { comments } = useAppSelector(selectCommentsArea, commentsAreaId);

  const sort = useAppSelector(selectCommentsSort);
  const page = useAppSelector(selectCommentsPage);
  const totalPages = useAppSelector(selectCommentsPagesCount);

  const isFetchingRootComments = useAppSelector(selectIsFetchingComments);
  const isSubmittingRootComment = useAppSelector(selectIsSubmittingRootComment);

  const canNavigateToPrevPage = useAppSelector(selectCanNavigateToPreviousCommentsPages);
  const canNavigateToNextPage = useAppSelector(selectCanNavigateToNextCommentsPages);

  const [search, setSearch] = useState('');

  useUpdateEffect(() => {
    dispatch(searchComments(search));
  }, [search]);

  return (
    <>
      <FiltersBar
        onSearch={setSearch}
        sort={sort}
        onSort={(sort) => dispatch(sortComments(sort))}
        pagination={{
          page,
          total: totalPages,
          onFirst: check(canNavigateToPrevPage, () => dispatch(firstCommentsPage())),
          onPrev: check(canNavigateToPrevPage, () => dispatch(previousCommentsPage())),
          onNext: check(canNavigateToNextPage, () => dispatch(nextCommentsPage())),
          onLast: check(canNavigateToNextPage, () => dispatch(lastCommentsPage())),
        }}
      />

      <Box marginY={4}>
        <CommentForm
          isLoading={isSubmittingRootComment}
          placeholder="Rédiger un commentaire..."
          onSubmit={(text) => dispatch(createRootComment(text))}
        />
      </Box>

      <Async
        loading={isFetchingRootComments}
        render={() => (
          <>
            <CommentsList comments={comments} />
            {comments.length === 0 && <NoResult search={search !== ''} />}
          </>
        )}
      />
    </>
  );
};

export const CurrentCommentsArea: React.FC = () => {
  const commentsArea = useAppSelector(selectCurrentCommentsArea);

  if (!commentsArea) {
    return null;
  }

  return <CommentsArea commentsAreaId={commentsArea.id} />;
};

const NoResult: React.FC<{ search?: boolean }> = ({ search }) => (
  <Fallback>
    {search
      ? "Aucun commentaire n'a été trouvé pour cette recherche."
      : "Aucun commentaire n'a été publié pour le moment."}
  </Fallback>
);
