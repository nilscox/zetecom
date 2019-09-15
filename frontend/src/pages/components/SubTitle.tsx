import React from 'react';

type SubTitleProps = {
  id: string;
};

const SubTitle: React.FC<SubTitleProps> = ({ id, children }) => (
  <h3 id={id} style={{ fontSize: '1.5rem', lineHeight: '1.5rem', margin: 25, marginTop: 40 }}>{ children }</h3>
);

export default SubTitle;
