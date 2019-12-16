import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import { Subject } from 'src/types/Subject';

type SubjectProps = {
  subject: Subject;
}

export const SubjectHeader: React.FC<SubjectProps> = ({ subject }) => (
  <>
    <Typography variant="h6">{ subject.subject }</Typography>
    <Typography variant="caption" color="textSecondary">
        Par { subject.author.nick }, le { moment(subject.date).format('DD.MM.YYYY') }
    </Typography>
  </>
);

const useBodyStyles = makeStyles({
  quote: {
    margin: '0 15px 15px',
    backgroundImage: 'url(/assets/images/quotation-mark.png)',
    backgroundPosition: 'left 30px top 0px',
    backgroundRepeat: 'no-repeat',
    minHeight: 50,
    fontSize: '1.1em',
    textIndent: 30,
    fontWeight: 'bold',
  },
});

export const SubjectBody: React.FC<SubjectProps> = ({ subject }) => {
  const classes = useBodyStyles({});

  return (
    <>
      { subject.quote && (
        <Typography className={classes.quote} color="textSecondary">
          { subject.quote }
        </Typography>
      ) }

      <Typography>
        { subject.text }
      </Typography>
    </>
  );
};

type SubjectComponentProps = {
  subject: Subject;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const SubjectComponent: React.FC<SubjectComponentProps> = ({ subject }) => {
  const classes = useStyles({});

  return (
    <Paper className={classes.container}>
      <SubjectHeader subject={subject} />
      <Divider className={classes.divider} />
      <SubjectBody subject={subject} />
    </Paper>
  );
};

export default SubjectComponent;
