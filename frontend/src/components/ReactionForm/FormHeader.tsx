import React from 'react';

import { User } from '../../types/User';

type FormHeaderProps = {
  author: User;
  onClose?: () => void;
};

const FormHeader = (props: FormHeaderProps) => {
  const { author, onClose } = props;

  return (
    <div className="reaction-header">
      <div className="reaction-author-avatar">
        <img src={author.avatar || '/assets/images/default-avatar.png'} />
      </div>
      <div className="reaction-author-nick">{author.nick}</div>
      <div onClick={() => onClose()} className="reaction-form-close">
        { onClose && '✕' }
      </div>
    </div>
  );
};

export { FormHeader };
