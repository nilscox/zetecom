import React from 'react';

type LoginMessageProps = {
  onClose: () => void;
};

export const LoginMessage = ({ onClose }: LoginMessageProps) => (
  <div className="login-message">

    { onClose && (
      <div onClick={() => onClose()} className="login-message-close">
        ✕
      </div>
    ) }

    <div className="message">
      <a href="#">Connectez-vous</a> pour poster une réaction.
    </div>

  </div>
);
