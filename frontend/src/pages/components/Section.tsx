import React from 'react';

import PageTitle from './PageTitle';

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{ margin: '20px 0' }}>
    { title && <PageTitle>{ title }</PageTitle> }
    { children }
  </div>
);

export default Section;
