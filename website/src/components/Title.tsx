import React from 'react';

const Title: React.FC<{ id: string }> = ({ id, children }) => (
  <div>
    <h2 id={id}>{ children }</h2>
  </div>
);

export default Title;
