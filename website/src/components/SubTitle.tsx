import React from 'react';

export type SubTitleProps = {
  className?: string;
  id: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ className, id, children }) => (
  <h3 id={id.replace(' ', '_')} className={className}>
    { children }
  </h3>
);

export default SubTitle;
