import React from 'react';

import Collapse from 'src/components/Collapse';
import CommentsList from 'src/components/CommentsList';
import Padding from 'src/components/Padding';
import { Comment } from 'src/types/Comment';

import FetchMoreReplies from './FetchMoreReplies';
import Indented from './Indented';

type RepliesProps = {
  replies: Comment[];
  displayReplies: boolean;
  remainingRepliesCount: number;
  fetchMoreReplies: () => void;
};

const Replies: React.FC<RepliesProps> = (props) => {
  const { replies, displayReplies, remainingRepliesCount, fetchMoreReplies } = props;

  return (
    <Collapse open={displayReplies}>

      { replies && replies.length > 0 && (
        <Padding top>
          <Indented>
            <CommentsList comments={replies || []} />
          </Indented>
        </Padding>
      ) }

      { remainingRepliesCount > 0 && (
        <FetchMoreReplies
          remainingRepliesCount={remainingRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
        />
      ) }

    </Collapse>
  );
};

export default Replies;
