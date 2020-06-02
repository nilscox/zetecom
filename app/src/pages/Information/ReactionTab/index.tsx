import React, { useRef, useState } from 'react';

import PaginatedList from 'src/components/PaginatedList';
import { ReactionCreationForm } from 'src/components/ReactionForm';
import ReactionsList from 'src/components/ReactionsList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import { useCurrentUser } from 'src/hooks/use-user';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';

import AsyncContent from '../../../components/AsyncContent';
import AddButton from '../../../dashboard/components/AddButton';

import Collapse from '@material-ui/core/Collapse';

type RecationsTabProps = {
  informationId: number;
};

const ReactionsTab: React.FC<RecationsTabProps> = ({ informationId }) => {
  const user = useCurrentUser();

  const [
    { loading, data, total },
    { setSearch },
    { sort, setSort },
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${informationId}/reactions`, parseReaction);

  const [showReactionForm, setShowReactionForm] = useState(false);
  const [reactions, { prepend }] = useEditableDataset(data);
  const containerRef = useRef<HTMLDivElement>();

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

      <div style={{ paddingTop: 16 }}>
        <PaginatedList
          sort={{
            type: sort || SortType.DATE_DESC,
            onChange: setSort,
          }}
          onSearch={setSearch}
          page={page}
          pageSize={10}
          total={total}
          onPageChange={setPage}
        >

          <div style={{ paddingTop: 16 }}>
            <Collapse in={showReactionForm}>
              <ReactionCreationForm
                onCreated={handleonReactionCreated}
                closeForm={() => setShowReactionForm(false)}
              />
            </Collapse>

            <AsyncContent
              loading={loading || !reactions}
              content={() => <ReactionsList reactions={reactions} />}
            />
          </div>

        </PaginatedList>
      </div>

    </div>
  );
};

export default ReactionsTab;
