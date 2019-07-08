import React, { useEffect, useState } from 'react';

import queryString from 'query-string';

const ALERT_TIMEOUT = 5000;

const EmailValidatedAlert: React.FC = () => {
  const [show, setShow] = useState(true);
  const width = window.innerWidth;

  if (queryString.parse(location.search)['email-validated'] !== 'true')
    return null;

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), ALERT_TIMEOUT);
    return () => clearTimeout(timeout);
  }, []);

  // not so mobile friendly :/
  return (
    <div
      className="email-validated-alert"
      style={{
        position: 'absolute',
        top: 30,
        right: 60,
        background: '#B7E1B4',
        border: 'solid 1px #4BB543',
        padding: '10px 60px',
        opacity: show ? 0.9 : 0,
        transition: 'opacity 0.8s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => setShow(false)}
      >
        x
      </div>
      Votre email a été validée. Bienvenue 🎉
    </div>
  );
};

export default EmailValidatedAlert;
