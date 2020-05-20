import React from 'react';

import Collapse from 'src/components/common/Collapse';
import { Reaction } from 'src/types/Reaction';

import Padding from '../../common/Padding';
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
