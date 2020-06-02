import React from 'react';

import Flex from 'src/components/Flex';

type FetchMoreRepliesProps = {
  remainingRepliesCount: number;
  fetchMoreReplies: () => void;
};

const FetchMoreReplies: React.FC<FetchMoreRepliesProps> = ({ remainingRepliesCount, fetchMoreReplies }) => {
  const s = remainingRepliesCount > 1 ? 's' : '';

  return (
    <Flex
      justifyContent="center"
      onClick={fetchMoreReplies}
      style={{ color: '#666', marginTop: 4, cursor: 'pointer' }}
    >
      ▾ &nbsp; { remainingRepliesCount } réaction{s} restante{s} &nbsp; ▾
    </Flex>
  );
};

export default FetchMoreReplies;
