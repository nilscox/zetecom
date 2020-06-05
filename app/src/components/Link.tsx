import React, { forwardRef } from 'react';

import clsx from 'clsx';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const RouterLink: React.FC<ReactRouterLinkProps> = forwardRef(({ className, ...props }, ref) => {
  const classes = useStyles({});

  return (
    <ReactRouterLink
      {...props}
      ref={ref as any}
      className={clsx(classes.link, className)}
    />
  );
});

export default RouterLink;

type LinkProps = React.HTMLProps<HTMLAnchorElement> & {
  openInNewTab?: boolean;
};

export const Link: React.FC<LinkProps> = ({ openInNewTab, className, ...props }) => {
  const classes = useStyles({});
  const other: React.HTMLProps<HTMLAnchorElement> = {};

  if (openInNewTab)
    other.target = '_blank';

  return (
    <a
      {...props}
      {...other}
      className={clsx(classes.link, className)}
    />
  );
};
