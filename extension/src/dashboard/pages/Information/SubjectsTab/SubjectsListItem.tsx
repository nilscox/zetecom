import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MaterialLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Subject } from 'src/types/Subject';
import Link from 'src/components/common/Link';
import Flex from 'src/components/common/Flex';

import { SubjectBody, SubjectHeader } from './SubjectComponent';

const useStyles = makeStyles((theme: Theme) => ({
  panelSummary: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelDetail: {
    flexDirection: 'column',
  },
  icon: {
    paddingLeft: 5,
    fill: '#999',
  },
  bottomLink: {
    alignSelf: 'center',
    paddingTop: 24,
  },
  bottomLinkColor: {
    color: theme.palette.secondary.dark,
  },
}));

type SubjectsListItemProps = {
  subject: Subject;
  expanded: boolean;
  link: string;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
};

const SubjectsListItem: React.FC<SubjectsListItemProps> = ({ subject, expanded, link, onChange }) => {
  const classes = useStyles({});

  return (
    <ExpansionPanel expanded={expanded} onChange={onChange}>

      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ content: classes.panelSummary }}>
        <div>
          <SubjectHeader subject={subject} />
        </div>

        <Link to={link}>
          <Flex flexDirection="row" alignItems="center">
            <Typography variant="caption" color="textSecondary">{ subject.reactionsCount }</Typography>
            <MessageIcon fontSize="small" className={classes.icon} />
          </Flex>
        </Link>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={classes.panelDetail}>
        <SubjectBody subject={subject} />

        <Divider />

        <Link to={link} className={classes.bottomLink}>
          <MaterialLink className={classes.bottomLinkColor} component="span">Voir les réactions</MaterialLink>
        </Link>
      </ExpansionPanelDetails>

    </ExpansionPanel>
  );
}

export default SubjectsListItem;
