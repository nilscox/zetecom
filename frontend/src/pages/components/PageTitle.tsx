import React from 'react';

type TitleProps = {
  children: React.ReactNode;
};

const PageTitle: React.FC<TitleProps> = ({ children }) => (
  <div style={{ fontFamily: 'domine' }}>
    <h2 style={{ fontSize: '2rem', lineHeight: '2rem' }}>{ children }</h2>
  </div>
);

export default PageTitle;
