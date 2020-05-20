import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { parseReaction, Reaction } from 'src/types/Reaction';

import ReactionForm from './ReactionForm';

type ReactionEditionFormProps = {
  reaction: Reaction;
  onEdited: (reaction: Reaction) => void;
  closeForm?: () => void;
};

const ReactionEditionForm: React.FC<ReactionEditionFormProps> = ({ reaction, onEdited, closeForm }) => {
  const formRef = React.useRef(null);

  const opts: AxiosRequestConfig = { method: 'PUT', url: '/api/reaction/' + reaction.id };
  const [{ data, loading, error }, postReaction] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const onSubmit = (text: string) => postReaction({ data: { text } });

  useEffect(() => {
    if (data) {
      onEdited(data);

      if (formRef.current)
        formRef.current.clear();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onEdited, formRef]);

  return (
    <ReactionForm
      ref={formRef}
      placeholder="Éditez votre message..."
      preloadedMessage={reaction.text}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default ReactionEditionForm;
