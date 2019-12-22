import React from 'react';
import { Reaction } from 'src/types/Reaction';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import { makeStyles, Theme } from '@material-ui/core/styles';

type BookmarkItemProps = {
  reaction: Reaction;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
}));

const BookmarkItem: React.FC<BookmarkItemProps> = ({ reaction }) => {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <ReactionContainer reaction={reaction} onEdited={() => {}} />
    </div>
  );
};

export default BookmarkItem;
