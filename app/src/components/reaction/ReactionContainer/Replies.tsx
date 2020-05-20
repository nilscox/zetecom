import React from 'react';

import Collapse from 'src/components/common/Collapse';
import Loader from 'src/dashboard/components/Loader';
import { Reaction } from 'src/types/Reaction';

import Padding from '../../common/Padding';
import ReactionsList from '../ReactionsList';

import FetchMoreReplies from './FetchMoreReplies';
import Indented from './Indented';

import { Box } from '@material-ui/core';

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

      { replies && replies.length > 0 && (
        <Padding top>
          <Indented>
            <ReactionsList reactions={replies || []} />
          </Indented>
        </Padding>
      ) }

      { loading && (
        <Box paddingTop={6}>
          <Loader />
        </Box>
      ) }

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
