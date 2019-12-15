import React from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';

import { Subject } from 'src/types/Subject';
import { makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles({
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
  const classes = useStyles({});

  return (
    <>
      { subject.quote &&
        <Typography className={classes.quote} color="textSecondary">
          { subject.quote }
        </Typography>
      }

      <Typography>
        { subject.text }
      </Typography>
    </>
  );
};
