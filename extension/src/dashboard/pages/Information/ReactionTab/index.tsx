import React, { useState, useRef } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

import { Reaction, parseReaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import ReactionsList from 'src/components/reaction/ReactionsList';
import Loader from 'src/dashboard/components/Loader';
import ReactionCreationForm from 'src/components/reaction/ReactionForm';

import AddButton from '../../../components/AddButton';
import Collapse from '@material-ui/core/Collapse';
import { useCurrentUser } from 'src/hooks/use-user';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import PaginatedList from 'src/dashboard/components/PaginatedList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const useStyles = makeStyles((theme: Theme) => {
  return ({
    reactionForm: {
      margin: theme.spacing(2, 0, 3),
    },
  });
});

const ReactionsTab: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const user = useCurrentUser();

  const [
    { loading, data, totalPages },
    { setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${match.params.id}/reactions`, parseReaction);

  const [showReactionForm, setShowReactionForm] = useState(false);
  const [reactions, { prepend, replace }] = useEditableDataset(data);
  const containerRef = useRef<HTMLDivElement>();

  const classes = useStyles({});

  const handleShowReactionForm = () => {
    if (containerRef.current)
      containerRef.current.scrollIntoView();

    setShowReactionForm(true);
  };

  const handleonReactionCreated = (reaction: Reaction) => {
    prepend(reaction);
    setShowReactionForm(false);
  };

  return (
    <div ref={containerRef}>
      <AddButton show={user && !showReactionForm} onClick={handleShowReactionForm} />

      <PaginatedList
        sort={{
          type: sort || SortType.DATE_DESC,
          onChange: setSort,
        }}
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        <Collapse in={showReactionForm}>
          <ReactionCreationForm
            className={classes.reactionForm}
            onCreated={handleonReactionCreated}
            closeForm={() => setShowReactionForm(false)}
          />
        </Collapse>

        { loading || !reactions
          ? <Loader />
          : <ReactionsList reactions={reactions} onEdited={replace} />
        }

      </PaginatedList>

    </div>
  );
};

export default ReactionsTab;
