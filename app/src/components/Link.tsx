import React, { useRef } from 'react';

import clsx from 'clsx';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import env from 'src/utils/env';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  link: {
    textDecoration: 'none',
    color: palette.secondary.main,
    transition: 'color 200ms ease-in-out',
    '&:focus': {
      color: palette.secondary.light,
    },
  },
  linkColor: {
    color: palette.textLink.main,
    '&:hover': {
      color: palette.textLink.light,
    },
  },
  linkFocusColor: {
    '&:focus': {
      color: palette.primary.main,
    },
  },
}));

type RouterLinkProps = ReactRouterLinkProps & {
  color?: boolean;
  focusColor?: boolean;
}

const RouterLink: React.FC<RouterLinkProps> = ({ color, focusColor, className, ...props }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const classes = useStyles({});

  return (
    <ReactRouterLink
      ref={ref}
      onClick={() => ref && 'current' in ref && ref.current?.blur()}
      className={clsx(classes.link, color && classes.linkColor, focusColor && classes.linkFocusColor, className)}
      {...props}
    />
  );
};

export default RouterLink;

export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'color'> & {
  color?: boolean;
  focusColor?: boolean;
  openInNewTab?: boolean;
};

export const Link: React.FC<LinkProps> = ({ color, focusColor, openInNewTab, className, ...props }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const classes = useStyles({});
  const other: React.HTMLProps<HTMLAnchorElement> = {};

  if (openInNewTab)
    other.target = '_blank';

  return (
    <a
      ref={ref}
      onClick={() => console.log(ref.current)}
      className={clsx(classes.link, color && classes.linkColor, focusColor && classes.linkFocusColor, className)}
      {...props}
      {...other}
    />
  );
};

type WebsiteLinkProps = LinkProps & {
  to: string;
};

export const WebsiteLink: React.FC<WebsiteLinkProps> = ({ to, ...props }) => (
  <Link
    color
    focusColor
    openInNewTab
    target="_blank"
    rel="noopener noreferrer"
    href={env.WEBSITE_URL + to}
    {...props}
  />
);
