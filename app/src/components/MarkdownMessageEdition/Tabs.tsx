import React from 'react';

import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing, palette: { border, ...palette } }) => ({
  tab: ({ active }: { active: boolean }) => ({
    borderTop: `1px solid ${border.light}`,
    borderRight: `1px solid ${border.light}`,
    borderLeft: `1px solid ${border.light}`,
    ...(!active && {
      borderBottom: `1px solid ${border.light}`,
    }),
  }),
  separator: {
    width: spacing(4),
    borderBottom: `1px solid ${border.light}`,
    [breakpoints.down('xs')]: {
      width: spacing(2),
    },
  },
  filler: {
    flex: 1,
    borderBottom: `1px solid ${border.light}`,
  },
  tabButton: {
    padding: spacing(2, 4),
    [breakpoints.down('xs')]: {
      padding: spacing(1, 3),
      lineHeight: 0.8,
    },
    '&:hover': {
      background: 'none',
      color: palette.secondary.main,
      transition: 'color 200ms ease-in-out',
    },
  },
}));

type TabProps = {
  active: boolean;
  children: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ active, children }) => {
  const classes = useStyles({ active });

  return (
    <div className={classes.tab}>
      { children }
    </div>
  );
};

const TabSeparator = () => {
  const classes = useStyles();

  return <div className={classes.separator} />;
};

const TabFiller = () => {
  const classes = useStyles();

  return <div className={classes.filler} />;
};

type TabsProps = {
  currentTab: 'edit' | 'preview';
  setCurrentTab: (tab: 'edit' | 'preview') => void;
};

const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  const classes = useStyles();

  return (
    <Grid container>

      <TabSeparator />

      <Tab active={currentTab === 'edit'}>
        <Button disableRipple className={classes.tabButton} onClick={() => setCurrentTab('edit')}>Editer</Button>
      </Tab>

      <TabSeparator />

      <Tab active={currentTab === 'preview'}>
        <Button disableRipple className={classes.tabButton} onClick={() => setCurrentTab('preview')}>Aperçu</Button>
      </Tab>

      <TabFiller />

    </Grid>
  );
};

export default Tabs;
