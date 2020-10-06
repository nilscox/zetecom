import React from 'react';

import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown';
import dayjs from 'dayjs';

import RouterLink from 'src/components/Link';
import { CommentsArea } from 'src/types/CommentsArea';

import defaultCommentsAreaImage from './default-comments-area.png';

const imageRatio = 1.61803398875;

const useStyles = makeStyles<Theme, { folded?: boolean }>(({ breakpoints, spacing, palette }) => ({
  description: ({ folded }) => ({
    width: '100%',
    height: spacing(folded ? 20 : 40),
    padding: spacing(2),
    [breakpoints.down('md')]: {
      height: ({ folded }) => spacing((folded ? 20 : 30)),
    },
  }),
  left: {
    height: '100%',
  },
  right: {
    flex: 1,
    paddingLeft: spacing(4),
  },
  image: ({ folded }) => ({
    width: spacing((folded ? 20 : 40) * imageRatio),
    height: '100%',
    objectFit: 'cover',
    [breakpoints.down('md')]: {
      width: ({ folded }) => spacing((folded ? 20 : 30) * imageRatio),
    },
  }),
  title: {
    color: palette.secondary.main,
    fontSize: '1.4em',
    fontWeight: 'bold',
    [breakpoints.down('md')]: {
      fontSize: '1.2em',
    },
  },
  author: {
    fontWeight: 'bold',
  },
  dateAndCommentsCount: ({ folded }) => ({
    marginTop: spacing(folded ? 0 : 2),
    marginLeft: spacing(folded ? 8 : 0),
  }),
  foldButton: ({ folded }) => ({
    padding: 0,
    cursor: 'pointer',
    transform: `rotate(${folded ? 90 : 0 }deg)`,
    transition: 'transform 180ms ease-in-out',
  }),
  comments: {
    padding: spacing(2),
  },
}));

type CommentsAreaDescriptionProps = {
  commentsArea: CommentsArea;
  folded?: boolean;
  toggleFolded?: (ctrlKey: boolean) => void;
};

const CommentsAreaDescription: React.FC<CommentsAreaDescriptionProps> = ({ commentsArea, folded, toggleFolded }) => {
  const classes = useStyles({ folded });

  const handleToggleFolded = (e: React.MouseEvent) => {
    toggleFolded?.(e.ctrlKey);
  };

  return (
    <Grid container className={classes.description}>
      <Grid item className={classes.left}>
        <RouterLink to={`/commentaires/${commentsArea.id}`}>
          <img src={commentsArea.imageUrl || defaultCommentsAreaImage} className={classes.image} />
        </RouterLink>
      </Grid>

      <Grid item className={classes.right}>

        <RouterLink to={`/commentaires/${commentsArea.id}`}>
          <Typography className={classes.title}>{commentsArea.informationTitle}</Typography>
        </RouterLink>

        <Grid container direction={folded ? 'row' : 'column'}>
          <Grid item>
            <Typography variant="body2" className={classes.author}>{commentsArea.informationAuthor}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.dateAndCommentsCount}>
              { commentsArea.published && dayjs(commentsArea.published).format('D MMMM YYYY') }
              {' - '}
              { commentsArea.commentsCount } commentaire{ commentsArea.commentsCount !== 1 && 's' }
            </Typography>
          </Grid>
        </Grid>

      </Grid>

      {toggleFolded && (
        <Grid item>
          <IconButton disableRipple onClick={handleToggleFolded} className={classes.foldButton}>
            <ChevronDown fontSize="large" />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default CommentsAreaDescription;
