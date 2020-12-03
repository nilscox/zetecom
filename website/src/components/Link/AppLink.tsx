import React from 'react';

import { useEnvironment } from 'src/utils/env';

import { LinkProps } from './index';

const AppLink: React.FC<LinkProps> = (props) => {
  return <a {...props} href={(useEnvironment('APP_URL') || '') + (props.href || '')} />;
};

export default AppLink;
