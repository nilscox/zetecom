import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { useInformation } from 'src/utils/InformationContext';

import ReactionForm from './ReactionForm';

type ReactionCreationFormProps = {
  parent?: Reaction;
  closeForm?: () => void;
  onCreated: (reaction: Reaction) => void;
};

const ReactionCreationForm: React.FC<ReactionCreationFormProps> = ({
  parent,
  closeForm,
  onCreated,
}) => {
  const information = useInformation();

  const formRef = React.useRef(null);

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/reaction' };
  const [{ data, loading, error }, postReaction] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const onSubmit = (text: string) => postReaction({
    data: {
      informationId: information.id,
      parentId: parent ? parent.id : undefined,
      text,
    },
  });

  useEffect(() => {
    if (data) {
      onCreated(data);

      if (formRef.current)
        formRef.current.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formRef]);

  const getPlaceholder = () => {
    return parent
      ? `Répondez à ${parent.author.nick}`
      : 'Composez votre message...';
  };

  return (
    <ReactionForm
      ref={formRef}
      placeholder={getPlaceholder()}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default ReactionCreationForm;
