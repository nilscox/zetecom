import React from 'react';

import Collapse from 'src/components/Collapse';
import { CommentCreationForm } from 'src/components/CommentForm';
import Padding from 'src/components/Padding';
import { Comment } from 'src/types/Comment';

import Indented from './Indented';

type ReplyFormProps = {
  comment: Comment;
  displayReplyForm: boolean;
  closeReplyForm: () => void;
  onCreated: (comment: Comment) => void;
};

const ReplyForm: React.FC<ReplyFormProps> = (props) => {
  const { comment, displayReplyForm, closeReplyForm, onCreated } = props;

  return (
    <Collapse open={displayReplyForm}>
      <Padding top>
        <Indented>
          <CommentCreationForm
            parent={comment}
            closeForm={closeReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Padding>
    </Collapse>
  );
};

export default ReplyForm;
