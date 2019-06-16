import React from 'react';

import Title from './Title';

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{ margin: '20px 0' }}>
    { title && <Title>{ title }</Title> }
    { children }
  </div>
);

export default Section;
