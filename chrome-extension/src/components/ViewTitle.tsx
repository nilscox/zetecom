import React from 'react';

import Typography from '../components/Typography';

type ViewTitleProps = {
  title: string;
  subTitle: string;
};

const ViewTitle: React.FC<ViewTitleProps> = ({ title, subTitle }) => (
  <div style={{ margin: '10px 0' }}>
    <Typography variant="title" style={{ display: 'inline' }}>{ title }</Typography>
    <Typography variant="subtitle" style={{ display: 'inline', marginLeft: 15 }}>{ subTitle }</Typography>
  </div>
);

export default ViewTitle;
