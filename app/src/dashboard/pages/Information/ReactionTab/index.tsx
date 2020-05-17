import React, { useRef, useState } from 'react';

import PaginatedList from 'src/components/common/PaginatedList';
import ReactionCreationForm from 'src/components/reaction/ReactionForm/ReactionCreationForm';
import ReactionsList from 'src/components/reaction/ReactionsList';
import Loader from 'src/dashboard/components/Loader';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { useCurrentUser } from 'src/hooks/use-user';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';

import AddButton from '../../../components/AddButton';

import Collapse from '@material-ui/core/Collapse';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return ({
    reactionForm: {
      margin: theme.spacing(2, 0, 3),
    },
  });
});

type RecationsTabProps = {
  informationId: number;
};

const ReactionsTab: React.FC<RecationsTabProps> = ({ informationId }) => {
  const user = useCurrentUser();

  const [
    { loading, data, totalPages },
    { setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${informationId}/reactions`, parseReaction);

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
