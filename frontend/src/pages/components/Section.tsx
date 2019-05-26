import React from 'react';

type SectionProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => (
  <div style={{ margin: '20px 0' }}>
    { children }
  </div>
);

export default Section;
