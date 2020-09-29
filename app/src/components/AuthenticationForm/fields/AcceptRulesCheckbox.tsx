import React, { useState } from 'react';

import { Collapse } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { WebsiteLink } from 'src/components/Link';

import { Form } from '../types';

const useStyles = makeStyles(theme => ({
  checkbox: {
    marginTop: theme.spacing(2),
  },
  warning: {
    color: theme.palette.textWarning.main,
  },
}));

type AcceptRulesCheckbox = CheckboxProps & {
  form: Form;
  checked: boolean;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckbox> = ({ form, onChange, ...props }) => {
  const [showWarning, setShowWarning] = useState(false);
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!showWarning) {
      setShowWarning(true);
    } else {
      onChange?.(e, checked);
    }
  };

  return (
    <Collapse in={form === 'signup'}>
      <FormControlLabel
        control={<Checkbox id="accept-rules-checkbox" onChange={handleChange} {...props} />}
        label={<>J'accepte <WebsiteLink color focusHighlightColor to="/charte.html">la charte</WebsiteLink>.</>}
        className={classes.checkbox}
      />
      { showWarning && (
        <Typography className={classes.warning}>
          La charte est composée de quelques règles simples. Accordez 5 minutes à sa lecture avant de vous inscrire.
        </Typography>
      ) }
    </Collapse>
  );
};

export default AcceptRulesCheckbox;
