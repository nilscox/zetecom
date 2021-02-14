import React from 'react';

import type { CollapseProps } from '../Collapse';

const MockCollapse: React.FC<CollapseProps> = ({ in: isOpen, children }) => (
  <div style={{ display: isOpen ? 'block' : 'none' }}>{children}</div>
);

export default MockCollapse;
