import React from 'react';

import Collapse from 'src/components/common/Collapse';
import Loader from 'src/dashboard/components/Loader';
import { Reaction } from 'src/types/Reaction';

import ReactionsList from '../ReactionsList';

import FetchMoreReplies from './FetchMoreReplies';
import Indented from './Indented';

type RepliesProps = {
  replies: Reaction[];
  displayReplies: boolean;
  loading: boolean;
  remainingRepliesCount: number;
  fetchMoreReplies: () => void;
};

const Replies: React.FC<RepliesProps> = (props) => {
  const { replies, displayReplies, loading, remainingRepliesCount, fetchMoreReplies } = props;

  return (
    <Collapse open={displayReplies}>

      <Indented>
        <ReactionsList reactions={replies || []} />
        { loading && <Loader /> }
      </Indented>

      { remainingRepliesCount > 0 && !loading && (
        <FetchMoreReplies
          remainingRepliesCount={remainingRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
        />
      ) }

    </Collapse>
  );
};

export default Replies;
