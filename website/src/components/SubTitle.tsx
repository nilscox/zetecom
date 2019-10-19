import React from 'react';

type SubTitleProps = {
  id: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ id, children }) => (
  <h3 id={id}>
    { children }
  </h3>
);

export default SubTitle;
