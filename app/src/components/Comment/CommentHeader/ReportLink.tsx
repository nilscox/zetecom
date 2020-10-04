import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

type StylesProps = {
  show: boolean;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  link: ({ show }: StylesProps) => ({
    opacity: show ? 1 : 0,
    transition: 'opacity 160ms ease',
    marginRight: spacing(2),
    cursor: 'pointer',
    fontWeight: 'bold',
    color: palette.text.warning,
  }),
}));

type ReportLinkProps = {
  show: boolean;
  onClick: () => void;
};

const ReportLink: React.FC<ReportLinkProps> = ({ show, onClick }) => {
  const classes = useStyles({ show });

  return (
    <Typography variant="caption" className={classes.link} onClick={onClick}>
      Signaler
    </Typography>
  );
};

export default ReportLink;
