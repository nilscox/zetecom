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
        <img src={author.getAvatarUrl()} />
      </div>

      <div className="reaction-author-nick">{author.nick}</div>


      { onClose && (
        <div onClick={() => onClose()} className="reaction-form-close">
          ✕
        </div>
      ) }

    </div>
  );
};

export { FormHeader };
