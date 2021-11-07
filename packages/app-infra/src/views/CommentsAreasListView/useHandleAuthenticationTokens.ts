import { useEffect } from 'react';

import { authenticateWithToken, validateEmail } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const useHandleAuthenticationTokens = () => {
  const dispatch = useDispatch();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const emailValidationToken = query.get('jeton-validation-email');
  const authenticationToken = query.get('jeton-connexion');

  useEffect(() => {
    if (emailValidationToken) {
      dispatch(validateEmail(emailValidationToken));
    }
  }, [emailValidationToken]);

  useEffect(() => {
    if (authenticationToken) {
      dispatch(authenticateWithToken(authenticationToken));
    }
  }, [authenticationToken]);
};
