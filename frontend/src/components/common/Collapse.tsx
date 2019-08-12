import React from 'react';
import { Collapse as ReactCollapse } from 'react-collapse';
import { presets } from 'react-motion';

type CollapseProps = {
  open: boolean;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ open, children }) => {
  return (
    <ReactCollapse isOpened={open} springConfig={presets.stiff as {}}>
      { children }
    </ReactCollapse>
  );
};

export default Collapse;

// wanna bypass collapse?
// export default ({ open, children }: any) => open ? children : null;
