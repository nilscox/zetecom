import React from 'react';

import Flex from 'src/components/common/Flex';

type FetchMoreRepliesProps = {
  remainingReplies: number;
  fetchMoreReplies: () => void;
};

const FetchMoreReplies: React.FC<FetchMoreRepliesProps> = ({ remainingReplies, fetchMoreReplies }) => {
  const s = remainingReplies > 1 ? 's' : '';

  return (
    <Flex
      justifyContent="center"
      onClick={fetchMoreReplies}
      style={{ color: '#666', marginTop: 4, cursor: 'pointer' }}
    >
      ▾ &nbsp; { remainingReplies } réaction{s} restante{s} &nbsp; ▾
    </Flex>
  );
};

export default FetchMoreReplies;
