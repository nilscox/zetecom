import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(0, 4, 4, 0),
    zIndex: 1,
  },
}));

type AddReactionButtonProps = {
  show: boolean;
  onClick: () => void;
};

const AddReactionButton: React.FC<AddReactionButtonProps> = ({ show, onClick }) => {
  const classes = useStyles({});

  return (
    <Zoom
      in={show}
      style={{ transitionDelay: show ? '500ms' : '0ms' }}
    >
      <Fab color="primary" className={classes.button} onClick={onClick}>
        <AddIcon />
      </Fab>
    </Zoom>
  );
};

export default AddReactionButton;
