import React, { forwardRef, useRef } from 'react';

import clsx from 'clsx';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import env from 'src/utils/env';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  link: {
    textDecoration: 'none',
    color: palette.secondary.main,
    transition: 'color 200ms ease-in-out',
  },
  color: {
    color: palette.textLink.main,
    '&:hover': {
      color: palette.textLink.light,
    },
  },
  focusColor: {
    '&:focus': {
      color: palette.secondary.light,
    },
  },
  focusHighlightColor: {
    '&:focus': {
      color: palette.primary.main,
    },
  },
}));

export type RouterLinkProps = Omit<ReactRouterLinkProps, 'color'> & {
  color?: boolean;
  focusColor?: boolean;
  focusHighlightColor?: boolean;
}

const RouterLink: React.ForwardRefRenderFunction<HTMLAnchorElement, RouterLinkProps> = ({
  color,
  focusColor = true,
  focusHighlightColor,
  className,
  ...props
}, ref) => {
  // const ref = useRef<HTMLAnchorElement>(null);
  const classes = useStyles({});

  return (
    <ReactRouterLink
      ref={ref}
      onClick={() => ref && 'current' in ref && ref.current?.blur()}
      className={
        clsx(
          classes.link,
          color && classes.color,
          focusColor && classes.focusColor,
          focusHighlightColor && classes.focusHighlightColor,
          className,
        )
      }
      {...props}
    />
  );
};

export default forwardRef(RouterLink);

export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'color'> & {
  color?: boolean;
  focusColor?: boolean;
  focusHighlightColor?: boolean;
  openInNewTab?: boolean;
};

export const Link: React.FC<LinkProps> = ({
  color,
  focusColor = true,
  focusHighlightColor,
  openInNewTab,
  className,
  ...props
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const classes = useStyles({});
  const other: React.HTMLProps<HTMLAnchorElement> = {};

  if (openInNewTab)
    other.target = '_blank';

  return (
    <a
      ref={ref}
      className={
        clsx(
          classes.link,
          color && classes.color,
          focusColor && classes.focusColor,
          focusHighlightColor && classes.focusHighlightColor,
          className,
        )
      }
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
