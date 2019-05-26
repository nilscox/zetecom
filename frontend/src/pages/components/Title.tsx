import React from 'react';

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <div style={{ flex: 1, borderBottom: '1px solid #CCC' }} />
    <h2 style={{ fontSize: '2rem', margin: 10 }}>{ children }</h2>
    <div style={{ flex: 1, borderBottom: '1px solid #CCC' }} />
  </div>
);

export default Title;
