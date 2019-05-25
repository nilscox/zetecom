import React, { useContext, useState, useRef } from 'react';

import { Reaction } from '../../types/Reaction';
import { Information } from '../../types/Information';
import { postReaction, updateReaction } from '../../api/reaction';
import InformationContext from '../../utils/InformationContext';
import UserContext from '../../utils/UserContext';

import { LoginMessage } from './LoginMessage';
import { FormHeader } from './FormHeader';
import { FormBody } from './FormBody';

import './ReactionForm.css';

type ReactionFormProps = {
  preloadedReaction?: Reaction;
  replyTo?: Reaction;
  onSubmitted: (reaction: Reaction) => void;
  onClose?: () => void;
};

const ReactionForm = (props: ReactionFormProps) => {
  const { preloadedReaction, replyTo, onClose, onSubmitted } = props;
  const { user } = useContext(UserContext);
  const information: Information = useContext(InformationContext);
  const [submitting, setSubmitting] = useState(false);
  const formBodyRef = useRef(null);

  const onSubmit = (quote: string | null, text: string) => {
    setSubmitting(true);

    const promise = preloadedReaction
      ? updateReaction(preloadedReaction.id, text)
      : postReaction(information.id, quote, text, replyTo ? replyTo.id : undefined);

    promise
      .then((reaction: Reaction) => {
        formBodyRef.current.clear();
        setSubmitting(false);
        onSubmitted(reaction);
      });
  };

  if (!user)
    return <LoginMessage onClose={onClose} />;

  return (
    <div className="reaction-form">
      <FormHeader author={user} onClose={onClose} />
      <FormBody
        ref={formBodyRef}
        preloadedReaction={preloadedReaction}
        replyTo={replyTo}
        isSubmitting={submitting}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export { ReactionForm };
