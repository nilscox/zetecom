import React, { useState } from 'react';
import moment from 'moment';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MaterialLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import { Subject, parseSubject } from 'src/types/Subject';
import SearchField from 'src/dashboard/components/SearchField';
import useAxios from 'src/hooks/use-axios';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';
import useUpdateEffect from 'src/hooks/use-update-effect';
import Pagination from 'src/dashboard/components/Pagination';
import Loader from 'src/dashboard/components/Loader';
import Flex from 'src/components/common/Flex';
import Link from 'src/components/common/Link';

const useSubjects = (informationId: number, search: string, page: number) => {
  const [result, refetch] = useAxios<Paginated<Subject>>(
    `/api/information/${informationId}/subjects`,
    paginatedResults(parseSubject),
  );

  useUpdateEffect(() => {
    const opts: any = { params: {} };

    if (search)
      opts.params.search = search;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page, search]);

  return result;
};

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
  },
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
  bottomLink: {
    alignSelf: 'center',
    paddingTop: 24,
  },
  bottomLinkColor: {
    color: theme.palette.secondary.dark,
  },
}));

const SubjectsTab: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const informationId = Number(match.params.id);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useSubjects(informationId, search, page);

  const [expanded, setExpanded] = useState<number | false>(false);
  const classes = useStyles({});

  const handleChange = (subjectId: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? subjectId : false);
  };

  const renderSubject = (subject: Subject) => (
    <ExpansionPanel key={subject.id} expanded={expanded === subject.id} onChange={handleChange(subject.id)}>

      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ content: classes.panelSummary }}>
        <div>
          <Typography variant="h6">{ subject.subject }</Typography>
          <Typography variant="caption" color="textSecondary">
            Par { subject.author.nick }, le { moment(subject.date).format('DD.MM.YYYY') }
          </Typography>
        </div>

        <Link to="">
          <Flex flexDirection="row" alignItems="center">
            <Typography variant="caption" color="textSecondary">{ subject.reactionsCount }</Typography>
            <MessageIcon color="disabled" fontSize="small" className={classes.icon} />
          </Flex>
        </Link>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={classes.panelDetail}>
        <Typography className={classes.quote} color="textSecondary">
          { subject.quote }
        </Typography>

        <Typography>
          { subject.text }
        </Typography>

        <Divider />

        <Link to="" className={classes.bottomLink}>
          <MaterialLink className={classes.bottomLinkColor} component="span">Voir les réactions</MaterialLink>
        </Link>
      </ExpansionPanelDetails>

    </ExpansionPanel>
  );

  return (
    <>

      <Flex flexDirection="row">
        <SearchField onSearch={setSearch} />
        <Pagination page={page} pageSize={10} total={data ? data.total : undefined} onPageChange={setPage} />
      </Flex>

      { loading
        ? <Loader />
        : data.items.map(renderSubject)
      }

    </>
  );
};

export default SubjectsTab;
