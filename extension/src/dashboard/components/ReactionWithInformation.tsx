import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Reaction } from 'src/types/Reaction';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import RouterLink from 'src/components/common/Link';
import Text from 'src/components/common/Text';

type ReactionWithInformationProps = {
  reaction: Reaction;
  informationLink: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
  },
  informationContainer: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  informationImage: {
    width: 120,
    height: 80,
    marginRight: theme.spacing(1),
  },
  reactionContainer: {
    flex: 3,
  },
}));

const ReactionWithInformation: React.FC<ReactionWithInformationProps> = ({ reaction, informationLink }) => {
  const classes = useStyles({});

  return (
    <div className={classes.container}>

      <RouterLink to={informationLink} className={classes.informationContainer}>
        <Text bold size={20}>
          { reaction.information.title }
        </Text>
        <img src={reaction.information.image || ''} className={classes.informationImage} />
      </RouterLink>

      <div className={classes.reactionContainer}>
        <ReactionContainer reaction={reaction} />
      </div>

    </div>
  );
};

export default ReactionWithInformation;
