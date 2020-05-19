import React from 'react';

import Flex from 'src/components/common/Flex';
import { useTheme } from 'src/utils/Theme';

import { makeStyles } from '@material-ui/core';

const useIndentedStyles = makeStyles(({ breakpoints, spacing, palette: { border } }) => ({
  bar: {
    borderLeft: `6px solid ${border.main}`,
    paddingLeft: spacing(3),
    [breakpoints.down('xs')]: {
      borderLeft: `3px solid ${border.main}`,
      paddingLeft: spacing(2),
    },
  },
}));

const Indented: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useIndentedStyles();
  const { sizes: { big } } = useTheme();

  return (
    <Flex flexDirection="row" pt={big}>
      <div className={classes.bar} />
      <div style={{ flex: 1 }}>
        { children }
      </div>
    </Flex>
  );
};

export default Indented;
