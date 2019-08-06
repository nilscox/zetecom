import React, { useEffect, useState } from 'react';
import  { Collapse as ReactCollapse } from 'react-collapse';
import { presets } from 'react-motion';

import { useTheme } from 'src/utils/Theme';

type CollapseProps = {
  open: boolean;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ open, children }) => {
  const { animation: { slow } } = useTheme();

  return (
    <ReactCollapse isOpened={open} springConfig={presets.stiff as any}>
      { children }
    </ReactCollapse>
  );
};

export default Collapse;

// wanna bypass collapse?
// export default ({ open, children }: any) => open ? children : null;
