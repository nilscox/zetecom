import React from 'react';

import env from 'src/utils/env';

type WebsiteLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  to: string;
};

const WebsiteLink: React.FC<WebsiteLinkProps> = ({ to, ...props }) => (
  <a target="_blank" rel="noopener noreferrer" href={env.WEBSITE_URL + to} {...props}></a>
);

export default WebsiteLink;
