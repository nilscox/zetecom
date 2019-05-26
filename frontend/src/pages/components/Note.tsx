import React from 'react';

type NodeProps = {
  children: React.ReactNode;
};

const Node: React.FC<NodeProps> = ({ children }) => (
  <p style={{ borderLeft: '5px solid #CCC', marginLeft: 10, paddingLeft: 10 }}>
    { children }
  </p>
);

export default Node;
