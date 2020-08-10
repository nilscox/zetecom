import React from 'react';

import { Box, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { UserAvatarNick } from 'src/components/UserAvatar';
import { useCurrentUser } from 'src/contexts/UserContext';

const useStyles = makeStyles(({ breakpoints, palette: { border }, spacing }) => ({
  container: {
    borderTop: `1px solid ${border.veryLight}`,
    borderBottom: `1px solid ${border.light}`,
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.02)',
    padding: spacing(2),
    [breakpoints.down('xs')]: {
      padding: spacing(1),
    },
  },
  buttonSmall: {
    fontSize: spacing(4),
    [breakpoints.down('xs')]: {
      fontSize: spacing(3),
    },
    '& svg': {
      fontSize: 'inherit',
    },
  },
}));

type FormHeaderProps = {
  closeForm?: () => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ closeForm }) => {
  const classes = useStyles();
  const user = useCurrentUser();

  if (!user)
    return null;

  return (
    <div className={`MuiPaper-rounded ${classes.container}`}>
      { closeForm && (
        <Box position="absolute" top={0} right={0}>
          <IconButton
            size="small"
            onClick={closeForm}
            classes={{ sizeSmall: classes.buttonSmall }}
            role="Fermer le formulaire"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) }
      <UserAvatarNick small user={user} />
    </div>
  );
};

export default FormHeader;
