import React from 'react';

import { Collapse as ReactCollapse, CollapseProps as ReactCollapseProps } from 'react-collapse';

type CollapseProps = Omit<ReactCollapseProps, 'isOpened' | 'springConfig'> & {
  open: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ open, ...props }) => {
  return <ReactCollapse isOpened={open} {...props} />;
};

export default Collapse;

// wanna bypass collapse?
// export default ({ open, children }: any) => open ? children : null;
