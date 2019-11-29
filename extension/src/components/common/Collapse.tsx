import React from 'react';
import { Collapse as ReactCollapse, CollapseProps as ReactCollapseProps } from 'react-collapse';

type CollapseProps = Omit<ReactCollapseProps, 'isOpened' | 'springConfig'> & {
  open: boolean;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ open, children, ...props }) => {
  return (
    <ReactCollapse isOpened={open} {...props}>
      { children }
    </ReactCollapse>
  );
};

export default Collapse;

// wanna bypass collapse?
// export default ({ open, children }: any) => open ? children : null;
