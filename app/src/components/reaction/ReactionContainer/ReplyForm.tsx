import React from 'react';

import Collapse from 'src/components/common/Collapse';
import { Reaction } from 'src/types/Reaction';

import ReactionCreationForm from '../ReactionForm/ReactionCreationForm';

import Indented from './Indented';

type ReplyFormProps = {
  reaction: Reaction;
  displayReplyForm: boolean;
  closeReplyForm: () => void;
  onCreated: (reaction: Reaction) => void;
};

const ReplyForm: React.FC<ReplyFormProps> = (props) => {
  const { reaction, displayReplyForm, closeReplyForm, onCreated } = props;

  return (
    <Collapse open={displayReplyForm}>
      <Indented>
        <ReactionCreationForm
          parent={reaction}
          closeForm={closeReplyForm}
          onCreated={onCreated}
        />
      </Indented>
    </Collapse>
  );
};

export default ReplyForm;
