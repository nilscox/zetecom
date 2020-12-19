import React from 'react';

import { Button, Grid, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, { active?: boolean }>(({ breakpoints, spacing, palette }) => ({
  container: {
    borderBottom: `1px solid ${palette.border.main}`,
  },
  tab: ({ active }: { active: boolean }) => ({
    margin: spacing(0, 2),
    transition: 'border-bottom-color 120ms ease-in-out',
    borderBottom: '2px solid',
    borderBottomColor: 'transparent',
    ...(active && {
      borderBottomColor: palette.primary.main,
    }),
  }),
  tabButton: {
    padding: spacing(1, 4),
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

  return <div className={classes.tab}>{children}</div>;
};

type TabsProps = {
  currentTab: 'edit' | 'preview';
  setCurrentTab: (tab: 'edit' | 'preview') => void;
};

const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  const classes = useStyles({});

  return (
    <Grid container className={classes.container}>
      <Tab active={currentTab === 'edit'}>
        <Button disableRipple className={classes.tabButton} onClick={() => setCurrentTab('edit')}>
          Editer
        </Button>
      </Tab>
      <Tab active={currentTab === 'preview'}>
        <Button disableRipple className={classes.tabButton} onClick={() => setCurrentTab('preview')}>
          Aperçu
        </Button>
      </Tab>
    </Grid>
  );
};

export default Tabs;
