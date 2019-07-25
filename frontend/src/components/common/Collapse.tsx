import React from 'react';
import { Collapse as ReactCollapse, CollapseProps as ReactCollapseProps } from 'react-collapse';

export const Collapse = ({ children, ...props }: ReactCollapseProps) => (
  <ReactCollapse {...props}>
    <div style={{ paddingTop: 10 }}>{ children }</div>
  </ReactCollapse>
);
