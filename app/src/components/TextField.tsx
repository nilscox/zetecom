import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

const useInputStyles = makeStyles(theme => ({
  root: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.light} !important`,
    },
  },
  focused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.palette.secondary.light}`,
  },
}));

export type TextFieldProps = Omit<MUITextFieldProps, 'error' | 'variant'> & {
  error?: React.ReactNode;
  onTextChange?: (value: string) => void;
};

const TextField: React.FC<TextFieldProps> = ({ error, onTextChange, ...props }) => {
  const classes = useStyles();
  const inputClasses = useInputStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // https://github.com/facebook/create-react-app/issues/8107#issuecomment-569780409
    /* eslint-disable no-unused-expressions */
    props.onChange?.(e);
    onTextChange?.(e.target.value);
    /* eslint-enable no-unused-expressions */
  };

  return (
    <MUITextField
      fullWidth
      error={!!error}
      helperText={error}
      size="small"
      variant="outlined"
      onChange={handleChange}
      classes={classes}
      InputProps={{ classes: inputClasses }}
      {...props}
    />
  );
};

export default TextField;
