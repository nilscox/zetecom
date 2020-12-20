import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

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

type FiltersType = {
  sort?: SortType;
  setSort: (sort: SortType) => void;
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  total?: number;
};

type FiltersProps = {
  filters: FiltersType;
};

const Filters: React.FC<FiltersProps> = ({ filters }) => (
  <FiltersBar
    sort={{ type: filters.sort || SortType.DATE_DESC, onChange: filters.setSort }}
    onSearch={filters.setSearch}
    page={filters.page}
    pageSize={10}
    total={filters.total}
    onPageChange={filters.setPage}
  />
);

type RootCommentComponentFormProps = {
  onRootCommentCreated?: (comment: Comment) => void;
};

const RootCommentCreationForm: React.FC<RootCommentComponentFormProps> = ({ onRootCommentCreated }) => (
  <Padding top>
    <CommentCreationForm onCreated={onRootCommentCreated} />
  </Padding>
);

type CommentsProps = {
  loading?: boolean;
  search?: string;
  comments: Comment[];
  commentsActions: CommentAction[];
};

const Comments: React.FC<CommentsProps> = ({ loading, comments, search, commentsActions }) => {
  const getFallbackMessage = () => {
    if (search) {
      return 'Aucun résultat ne correspond à cette recherche.';
    }

    return "Aucun commentaire n'a été publié pour le moment.";
  };

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <Fallback
          when={!comments.length}
          fallback={getFallbackMessage()}
          render={() => (
            <Padding top>
              <SearchQueryProvider value={search}>
                <CommentsList comments={comments} commentActions={commentsActions} />
              </SearchQueryProvider>
            </Padding>
          )}
        />
      )}
    />
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  comments: {
    padding: spacing(2),
  },
}));

type CommentsAreaComponentProps = {
  showDescription?: boolean;
  commentsArea: CommentsAreaType;
  comments?: Comment[];
  loadingComments?: boolean;
  commentsActions?: CommentAction[];
  folded?: boolean;
  toggleFolded?: (ctrlKey: boolean) => void;
  filters?: FiltersType;
  onRootCommentCreated?: (comment: Comment) => void;
  linkToInformation?: boolean;
};

const CommentsAreaComponent: React.FC<CommentsAreaComponentProps> = ({
  showDescription = true,
  commentsArea,
  comments,
  commentsActions,
  loadingComments,
  folded,
  toggleFolded,
  filters,
  onRootCommentCreated,
  linkToInformation,
}) => {
  const classes = useStyles();
  const user = useCurrentUser();

  const renderFilters = !!filters;
  const renderRootCommentCreationForm = user && onRootCommentCreated;
  const renderComments = loadingComments || (!folded && comments);

  return (
    <CommentsAreaProvider value={commentsArea}>
      <Grid container direction="column" className="comments-area">
        {showDescription && (
          <CommentsAreaDescription
            commentsArea={commentsArea}
            folded={folded}
            toggleFolded={toggleFolded}
            linkToInformation={linkToInformation}
          />
        )}

        {[renderFilters, renderRootCommentCreationForm, renderComments].some(Boolean) && (
          <Grid item className={classes.comments}>
            {renderFilters && <Filters filters={filters} />}
            {renderRootCommentCreationForm && <RootCommentCreationForm onRootCommentCreated={onRootCommentCreated} />}
            {renderComments && (
              <Comments
                comments={comments}
                loading={loadingComments}
                search={filters?.search}
                commentsActions={commentsActions}
              />
            )}
          </Grid>
        )}
      </Grid>
    </CommentsAreaProvider>
  );
};

export default CommentsAreaComponent;
