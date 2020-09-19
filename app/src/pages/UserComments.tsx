import React, { useCallback, useEffect, useState } from 'react';

import { Card, CardContent, makeStyles } from '@material-ui/core';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown';

import Authenticated from 'src/components/Authenticated';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';

import AsyncContent from '../components/AsyncContent';
import Collapse from '../components/Collapse';
import CommentsAreaOverview from '../components/CommentsAreaOverview';
import CommentsList from '../components/CommentsList';
import FiltersBar from '../components/FiltersBar';
import RouterLink from '../components/Link';
import Padding from '../components/Padding';
import { CommentsAreaProvider } from '../contexts/CommentsAreaContext';
import useAxiosPaginated from '../hooks/use-axios-paginated';
import { parseComment } from '../types/Comment';
import { CommentsArea, parseCommentsArea } from '../types/CommentsArea';

const useParseCommentsAreaForUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback((data: any) => ({
    commentsArea: parseCommentsArea(data.commentsArea),
    comments: data.comments.map(parseComment),
  }), []);
};

type StylesProps = {
  collapsed: boolean;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  userCommentsCommentsArea: {
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

type UserCommentsCommentsAreaProps = {
  commentsArea: CommentsArea;
  collapsed: boolean;
  toggleCollapsed: (ctrlKey: boolean) => void;
};

const UserCommentsCommentsArea: React.FC<UserCommentsCommentsAreaProps> = ({
  commentsArea,
  collapsed,
  toggleCollapsed,
}) => {
  const classes = useStyles({ collapsed });

  return (
    <CommentsAreaProvider value={commentsArea}>

      <Card variant="outlined" elevation={2} className={classes.userCommentsCommentsArea}>
        <CardContent classes={{ root: classes.cardContent }}>

          <div
            style={{ display: 'inline-flex' }}
            className={classes.collapseButton}
            onClick={e => toggleCollapsed(e.ctrlKey)}
          >
            <ChevronDown />
          </div>

          <CommentsAreaOverview
            title={<RouterLink to={`/commentaires/${commentsArea.id}`}>{ commentsArea.informationTitle }</RouterLink>}
            commentsArea={commentsArea}
            inline={collapsed}
          />

          <Collapse open={!collapsed}>
            <Padding top>
              <CommentsList comments={commentsArea.comments} />
            </Padding>
          </Collapse>

        </CardContent>
      </Card>

    </CommentsAreaProvider>
  );
};

const useCollapseCommentsArea = (data: { commentsArea: CommentsArea }[]) => {
  const [collapsed, setCollapsed] = useState<Map<CommentsArea, boolean>>(new Map());

  useEffect(() => {
    if (data)
      setCollapsed(new Map(data.map(({ commentsArea }) => [commentsArea, false])));
  }, [data]);

  const toggle = (commentsArea: CommentsArea) => {
    const copy = new Map(collapsed);

    copy.set(commentsArea, !collapsed.get(commentsArea));

    setCollapsed(copy);
  };

  const collapseAll = () => {
    setCollapsed(new Map(data.map(({ commentsArea }) => [commentsArea, true])));
  };

  return [collapsed, toggle, collapseAll] as const;
};

const UserComments: React.FC = () => {
  const parseCommentsAreaForUser = useParseCommentsAreaForUser();
  const [
    { loading, data, total, error },
    { search, setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/comment/me', parseCommentsAreaForUser);

  if (error)
    throw error;

  const [collapsed, toggleCollapsed, collapseAll] = useCollapseCommentsArea(data);

  const handleToggleCollapse = (commentsArea: CommentsArea) => (ctrlKey: boolean) => {
    if (ctrlKey)
      collapseAll();
    else
      toggleCollapsed(commentsArea);
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

            {data.map(({ commentsArea, comments }) => (
              <Padding key={commentsArea.id} top>
                <UserCommentsCommentsArea
                  commentsArea={{ ...commentsArea, comments }}
                  collapsed={collapsed.get(commentsArea)}
                  toggleCollapsed={handleToggleCollapse(commentsArea)}
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
