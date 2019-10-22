import React from 'react';

const { WEBSITE_URL } = process.env;

type WebsiteLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  to: string;
};

const WebsiteLink: React.FC<WebsiteLinkProps> = ({ to, ...props }) => (
  <a target="_blank" rel="noopener noreferrer" href={WEBSITE_URL + to} {...props}></a>
);

export default WebsiteLink;
