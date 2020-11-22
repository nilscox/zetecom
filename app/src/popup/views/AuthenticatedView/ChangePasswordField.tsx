import React, { useEffect, useState } from 'react';

import { Collapse, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Button from 'src/components/Button';
import FormError from 'src/components/FormError';
import TextField from 'src/components/TextField';

import useChangePassword from './useChangePassword';

const useStyles = makeStyles(({ palette }) => ({
  passwordChanged: {
    color: palette.success.dark,
  },
}));

const ChangePasswordField = () => {
  const [displayForm, setDisplayForm] = useState(false);

  const [changePassword, { errors, passwordChanged }] = useChangePassword();
  const { fieldErrors, globalError, unhandledError } = errors || {};
  const [password, setPassword] = useState('');

  const classes = useStyles();

  if (unhandledError) {
    throw unhandledError;
  }

  useEffect(() => {
    if (passwordChanged) {
      setPassword('');
      setDisplayForm(false);
    }
  }, [passwordChanged, setPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword(password);
  };

  return (
    <>
      <Collapse in={displayForm}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            id="password"
            name="password"
            label="Nouveau mot de passe"
            error={fieldErrors?.password}
            value={password}
            onTextChange={setPassword}
          />
          <FormError error={globalError} />
        </form>
      </Collapse>

      {passwordChanged ? (
        <Typography className={classes.passwordChanged}>Votre mot de passe a bien été mis à jour !</Typography>
      ) : (
        <Button onClick={() => setDisplayForm(d => !d)}>
          Changer de mot de passe
        </Button>
      )}
    </>
  );
};

export default ChangePasswordField;
