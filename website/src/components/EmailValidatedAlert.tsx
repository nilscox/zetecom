import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './EmailValidatedAlert.scss';

const TIMEOUT = 10000;

const EmailValidatedAlert: React.FC = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search);

    if (query['email-validated'] === 'true') {
      setShow(true);

      const queryCopy = { ...query };
      delete queryCopy['email-validated'];

      history.replace({ search: queryString.stringify(queryCopy) });

      const timeout = setTimeout(() => setShow(false), TIMEOUT);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className={`email-validated${show ? ' show' : ''}`}>
      <div className="close" onClick={() => setShow(false)}>x</div>
      Votre email a été validée. Bienvenue 🎉
    </div>
  );
};

export default EmailValidatedAlert;
