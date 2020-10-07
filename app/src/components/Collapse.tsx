import React from 'react';

import { Collapse as MuiCollapse, CollapseProps as MuiCollapseProps } from '@material-ui/core';

type CollapseProps = Omit<MuiCollapseProps, 'isOpened' | 'springConfig'> & {
  open: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ open, ...props }) => {
  return <MuiCollapse in={open} {...props} />;
};

export default Collapse;
