import React from 'react';

import Collapse from 'src/components/Collapse';
import Padding from 'src/components/Padding';
import { ReactionCreationForm } from 'src/components/ReactionForm';
import { Reaction } from 'src/types/Reaction';

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
      <Padding top>
        <Indented>
          <ReactionCreationForm
            parent={reaction}
            closeForm={closeReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Padding>
    </Collapse>
  );
};

export default ReplyForm;
