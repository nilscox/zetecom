import React from 'react';

import './EmailValidatedAlert.scss';

const EmailValidatedAlert: React.FC = () => (
  <div className="email-validated">
    <div className="close">x</div>
    Votre email a été validée. Bienvenue 🎉
  </div>
);

export default EmailValidatedAlert;
