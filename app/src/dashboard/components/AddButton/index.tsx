import React from 'react';

import Fab from '@material-ui/core/Fab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(0, 4, 4, 0),
    zIndex: 1,
  },
}));

type AddButtonProps = {
  show: boolean;
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ show, onClick }) => {
  const classes = useStyles({});

  return (
    <Zoom
      in={show}
      style={{ transitionDelay: show ? '500ms' : '0ms' }}
    >
      <Fab color="primary" className={classes.button} onClick={onClick}>
        <AddIcon data-testid="add-icon" />
      </Fab>
    </Zoom>
  );
};

export default AddButton;
