import React, { useEffect, useState } from 'react';

import { Reaction } from 'src/types/Reaction';
import { fetchReplies } from 'src/api/reaction';
import { useTheme } from 'src/utils/Theme';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';

import ReactionComponent from './Reaction';
import ReactionsList from './ReactionsList';

const useReplies = (parent?: Reaction) => {
  const [replies, setReplies] = useState<Reaction[] | undefined>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!parent)
      return;

    setFetching(true);

    fetchReplies(parent.id)
      .then(replies => {
        setReplies(replies);
        setFetching(false);
      });
  }, [parent]);

  return {
    fetchingReplies: fetching,
    replies,
  };
};

type ReactionContainerProps = {
  reaction: Reaction;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [fetchReplies, setFetchReplies] = useState(false);
  const { fetchingReplies, replies } = useReplies(fetchReplies ? reaction : undefined);

  const { sizes: { big }, colors: { border } } = useTheme();

  const toggleReplies = () => {
    setFetchReplies(true);
    setDisplayReplies(!displayReplies);
  };

  return (
    <>
      <ReactionComponent reaction={reaction} displayReplies={displayReplies} toggleReplies={toggleReplies} />
      <Collapse open={displayReplies} innerMargin={big}>
        <div style={{ marginTop: big, borderLeft: `8px solid ${border}`, paddingLeft: big }}>
          { fetchingReplies ? (
            <Loader />
          ) : (
            <ReactionsList reactions={replies} />
          ) }
        </div>
      </Collapse>
    </>
  );
};

export default ReactionContainer;
