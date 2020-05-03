import React, { useState } from 'react';

import WebsiteLink from 'src/popup/components/WebsiteLink';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  checkbox: {
    marginTop: theme.spacing(2),
  },
  warning: {
    color: theme.palette.warning.dark,
  },
}));

type AcceptRulesCheckbox = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckbox> = ({ checked, onChange }) => {
  const [showWarning, setShowWarning] = useState(false);
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showWarning)
      setShowWarning(true);
    else
      onChange(e.target.checked);
  };

  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={<>J'accepte <WebsiteLink to="/charte.html">la charte</WebsiteLink>.</>}
        className={classes.checkbox}
      />
      { showWarning && (
        <Typography className={classes.warning}>
          La charte est composée de quelques règles simples. Accordez 5 minutes à sa lecture avant de vous inscrire.
        </Typography>
      ) }
    </>
  );
};

export default AcceptRulesCheckbox;
