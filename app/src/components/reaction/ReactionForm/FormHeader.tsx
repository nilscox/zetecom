import React from 'react';

import UserAvatarNick from 'src/components/common/UserAvatarNick';
import { useCurrentUser } from 'src/utils/UserContext';

import { Box, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(({ breakpoints, palette: { border }, spacing }) => ({
  container: {
    borderBottom: `1px solid ${border.light}`,
    padding: spacing(1),
    position: 'relative',
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

  // TODO: this check should not be done here
  if (!user)
    return null;

  return (
    <div className={`MuiPaper-rounded ${classes.container}`}>
      { closeForm && (
        <Box position="absolute" top={0} right={0}>
          <IconButton size="small" onClick={closeForm} classes={{ sizeSmall: classes.buttonSmall }}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) }
      <UserAvatarNick small user={user} />
    </div>
  );
};

export default FormHeader;
