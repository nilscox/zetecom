import React from 'react';

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import { CommentsArea as CommentsAreaType } from 'src/types/CommentsArea';

import { CommentsAreaProvider } from '../../contexts/CommentsAreaContext';
import { SearchQueryProvider } from '../../contexts/SearchQueryContext';
import { useCurrentUser } from '../../contexts/UserContext';
import { Comment } from '../../types/Comment';
import { SortType } from '../../types/SortType';
import AsyncContent from '../AsyncContent';
import { CommentAction } from '../Comment/CommentContainer';
import CommentCreationForm from '../CommentForm/CommentCreationForm';
import CommentsList from '../CommentsList';
import Fallback from '../Fallback';
import FiltersBar from '../FiltersBar';
import Padding from '../Padding';

import CommentsAreaDescription from './CommentAreaDescription';

const useStyles = makeStyles(({ spacing }) => ({
  comments: {
    padding: spacing(2),
  },
}));

type CommentsAreaComponentProps = {
  commentsArea: CommentsAreaType;
  comments?: Comment[];
  loadingComments?: boolean;
  commentsActions?: CommentAction[];
  folded?: boolean;
  toggleFolded?: (ctrlKey: boolean) => void;
  filters?: {
    sort?: SortType;
    setSort: (sort: SortType) => void;
    search: string;
    setSearch: (search: string) => void;
    page: number;
    setPage: (page: number) => void;
    total?: number;
  };
  onRootCommentCreated?: (comment: Comment) => void;
};

const CommentsAreaComponent: React.FC<CommentsAreaComponentProps> = ({
  commentsArea,
  comments,
  commentsActions,
  loadingComments,
  folded,
  toggleFolded,
  filters,
  onRootCommentCreated,
}) => {
  const classes = useStyles();
  const user = useCurrentUser();

  const renderFilters = !!filters;
  const renderRootCommentCreationForm = user && onRootCommentCreated;
  const renderComments = !folded && comments;

  const getFallbackMessage = () => {
    if (filters?.search) {
      return 'Aucun résultat ne correspond à cette recherche.';
    }

    return "Aucun commentaire n'a été publié pour le moment.";
  };

  const getComments = () => {
    if (!filters?.search) {
      return <CommentsList comments={comments} commentActions={commentsActions} />;
    }

    return (
      <SearchQueryProvider value={filters.search}>
        <CommentsList comments={comments} commentActions={commentsActions} />
      </SearchQueryProvider>
    );
  };

  return (
    <CommentsAreaProvider value={commentsArea}>
      <Grid container direction="column" component={Paper} variant="outlined">
        <CommentsAreaDescription commentsArea={commentsArea} folded={folded} toggleFolded={toggleFolded} />

        {[renderFilters, renderRootCommentCreationForm, renderComments].some(Boolean) && (
          <Grid item className={classes.comments}>
            {renderFilters && (
              <FiltersBar
                sort={{ type: filters.sort || SortType.DATE_DESC, onChange: filters.setSort }}
                onSearch={filters.setSearch}
                page={filters.page}
                pageSize={10}
                total={filters.total}
                onPageChange={filters.setPage}
              />
            )}

            {renderRootCommentCreationForm && (
              <Padding top bottom>
                <CommentCreationForm onCreated={onRootCommentCreated} />
              </Padding>
            )}

            {renderComments && (
              <Fallback
                when={!comments.length}
                fallback={<Typography variant="body2">{getFallbackMessage()}</Typography>}
                render={() => <AsyncContent loading={loadingComments} render={getComments} />}
              />
            )}
          </Grid>
        )}
      </Grid>
    </CommentsAreaProvider>
  );
};

export default CommentsAreaComponent;
