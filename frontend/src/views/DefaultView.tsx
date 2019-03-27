import React, { useContext, useEffect, useRef, useState } from 'react';

import { Reaction, ReactionLabel } from '../types/Reaction';
import { fetchRootReactions, postReaction } from '../fetch/fetchReactions';
import InformationContext from '../utils/InformationContext';
import { ReactionsList } from '../components/ReactionsList';
import { ReactionForm } from '../components/ReactionForm/ReactionForm';
import { Loader } from '../components/Loader';

type DefaultViewProps = {
  setAsMain: (reaction: Reaction) => void;
};

const DefaultView = (props: DefaultViewProps) => {
  const information = useContext(InformationContext);
  const [rootReactions, setRootReactions] = useState<Reaction[]>(undefined);

  const [submittingReply, setSubmittingReply] = useState(false);
  const replyFormRef = useRef(null);

  useEffect(() => {
    if (rootReactions)
      return;

    fetchRootReactions(information.id)
      .then(reactions => {
        if (reactions)
          setRootReactions(reactions);
      });
  }, [information]);

  if (!rootReactions)
    return <Loader />;

  const onSubmitReply = async (label: ReactionLabel, quote: string | null, text: string) => {
    setSubmittingReply(true);

    const reaction: Reaction = await postReaction(information.id, label, quote, text);

    setRootReactions([reaction, ...rootReactions]);
    setSubmittingReply(false);
    replyFormRef.current.clear();
  };

  return (
    <div>

      <div className="root-reaction-form">
        <ReactionForm
          onSubmitted={() => {}}
        />
      </div>

      <ReactionsList
        reactions={rootReactions}
        setAsMain={props.setAsMain}
      />

    </div>
  );
};

export { DefaultView };
