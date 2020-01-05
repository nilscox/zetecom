import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Reaction } from 'src/types/Reaction';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import RouterLink from 'src/components/common/Link';

type ReactionWithInformationProps = {
  reaction: Reaction;
  link: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(1, 0),
  },
  informationContainer: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  image: {
    width: 120,
    height: 80,
    marginRight: theme.spacing(1),
  },
  informationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reactionContainer: {
    flex: 3,
  },
}));

const ReactionWithInformation: React.FC<ReactionWithInformationProps> = ({ reaction, link }) => {
  const classes = useStyles({});

  return (
    <div className={classes.container}>

      <RouterLink to={link} className={classes.informationContainer}>
        <div className={classes.informationTitle}>
          { reaction.information.title }
        </div>

        <img src={reaction.information.image || ''} className={classes.image} />
      </RouterLink>
      <div className={classes.reactionContainer}>
        <ReactionContainer reaction={reaction} onEdited={() => {}} />
      </div>
    </div>
  );
};

export default ReactionWithInformation;
