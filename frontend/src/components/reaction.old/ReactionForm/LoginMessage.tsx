import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to="/faq#connexion">Connectez-vous</Link> pour poster une réaction.
    </div>

  </div>
);
