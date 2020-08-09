import React, { useCallback, useEffect, useState } from 'react';

import Authenticated from 'src/components/Authenticated';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';

import AsyncContent from '../components/AsyncContent';
import Collapse from '../components/Collapse';
import Indented from '../components/Comment/CommentContainer/Indented';
import CommentsList from '../components/CommentsList';
import FiltersBar from '../components/FiltersBar';
import InformationOverview from '../components/InformationOverview';
import RouterLink from '../components/Link';
import Padding from '../components/Padding';
import { InformationProvider } from '../contexts/InformationContext';
import useAxiosPaginated from '../hooks/use-axios-paginated';
import { parseComment } from '../types/Comment';
import { Information, parseInformation } from '../types/Information';

import { Card, CardContent, makeStyles } from '@material-ui/core';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown';

const useParseInformationForUser = () => {
  return useCallback((data: any) => ({
    information: parseInformation(data.information),
    comments: data.comments.map(parseComment),
  }), []);
};

type StylesProps = {
  collapsed: boolean;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  userCommentsInformation: {
    position: 'relative',
  },
  cardContent: ({ collapsed }: StylesProps) => ({
    '&, &:last-child': {
      padding: collapsed ? spacing(2) : spacing(4),
    },
  }),
  collapseButton: ({ collapsed }: StylesProps) => ({
    position: 'absolute',
    top: spacing(2),
    right: spacing(2),
    color: palette.secondary.light,
    cursor: 'pointer',
    transform: `rotate(${collapsed ? 90 : 0}deg)`,
    transition: 'transform 180ms ease-in-out',
  }),
}));

type UserCommentsInformationProps = {
  information: Information;
  collapsed: boolean;
  toggleCollapsed: (ctrlKey: boolean) => void;
};

const UserCommentsInformation: React.FC<UserCommentsInformationProps> = ({
  information,
  collapsed,
  toggleCollapsed,
}) => {
  const classes = useStyles({ collapsed });

  return (
    <InformationProvider value={information}>

      <Card variant="outlined" elevation={2} className={classes.userCommentsInformation}>
        <CardContent classes={{ root: classes.cardContent }}>

          <div
            style={{ display: 'inline-flex' }}
            className={classes.collapseButton}
            onClick={e => toggleCollapsed(e.ctrlKey)}
          >
            <ChevronDown />
          </div>

          <InformationOverview
            title={<RouterLink to={`/information/${information.id}`}>{ information.title }</RouterLink>}
            information={information}
            inline={collapsed}
          />

          <Collapse open={!collapsed}>
            <Padding top>
              <CommentsList comments={information.comments} />
            </Padding>
          </Collapse>

        </CardContent>
      </Card>

    </InformationProvider>
  );
};

const useCollapseInformation = (data: { information: Information }[]) => {
  const [collapsed, setCollapsed] = useState<Map<Information, boolean>>(new Map());

  useEffect(() => {
    if (data)
      setCollapsed(new Map(data.map(({ information }) => [information, false])));
  }, [data]);

  const toggle = (information: Information) => {
    const copy = new Map(collapsed);

    copy.set(information, !collapsed.get(information));

    setCollapsed(copy);
  };

  const collapseAll = () => {
    setCollapsed(new Map(data.map(({ information }) => [information, true])));
  };

  return [collapsed, toggle, collapseAll] as const;
};

const UserComments: React.FC = () => {
  const parseInformationForUser = useParseInformationForUser();
  const [
    { loading, data, total, error },
    { search, setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/comment/me', parseInformationForUser);

  if (error)
    throw error;

  const [collapsed, toggleCollapsed, collapseAll] = useCollapseInformation(data);

  const handleToggleCollapse = (information: Information) => (ctrlKey: boolean) => {
    if (ctrlKey)
      collapseAll();
    else
      toggleCollapsed(information);
  };

  return (
    <Authenticated>
      <AsyncContent loading={loading}>
        {() => (
          <SearchQueryProvider value={search}>

            <FiltersBar
              onSearch={setSearch}
              page={page}
              pageSize={10}
              total={total}
              onPageChange={setPage}
            />

            {data.map(({ information, comments }) => (
              <Padding key={information.id} top>
                <UserCommentsInformation
                  information={{ ...information, comments }}
                  collapsed={collapsed.get(information)}
                  toggleCollapsed={handleToggleCollapse(information)}
                />
              </Padding>
            ))}

          </SearchQueryProvider>
        )}
      </AsyncContent>
    </Authenticated>
  );
};

export default UserComments;
