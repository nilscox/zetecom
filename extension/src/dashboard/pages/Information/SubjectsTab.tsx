import React, { useState } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RouteComponentProps } from 'react-router-dom';

import { Subject, parseSubject } from 'src/types/Subject';
import SearchField from 'src/dashboard/components/SearchField';
import useAxios from 'src/hooks/use-axios';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';
import useUpdateEffect from 'src/hooks/use-update-effect';
import Pagination from 'src/dashboard/components/Pagination';
import Flex from 'src/components/common/Flex';
import Loader from 'src/dashboard/components/Loader';

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

const SubjectsTab: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const informationId = Number(match.params.id);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useSubjects(informationId, search, page);

  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (subjectId: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? subjectId : false);
  };

  const renderSubject = (subject: Subject) => (
    <ExpansionPanel key={subject.id} expanded={expanded === subject.id} onChange={handleChange(subject.id)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{ subject.subject }</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          { subject.text }
        </Typography>
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
