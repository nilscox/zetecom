import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FirstIcon from '@material-ui/icons/FirstPage';
import LastIcon from '@material-ui/icons/LastPage';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

const usePaginationStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(0, 1),
  },
  page: {
    margin: theme.spacing(0, 1),
    minWidth: 40,
  },
}));

type PaginationProps = {
  page: number;
  total?: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, total, pageSize, onPageChange }) => {
  const classes = usePaginationStyles({});

  // eslint-disable-next-line no-nested-ternary
  const lastPage = total === 0 ? 1 : (total ? Math.ceil(total / pageSize) : '-');

  const goToPage = (page: number) => () => onPageChange(page);

  return (
    <>

      <IconButton
        className={classes.icon}
        disabled={page <= 1}
        onClick={goToPage(1)}
        title="Première page"
      >
        <FirstIcon />
      </IconButton>

      <IconButton
        className={classes.icon}
        disabled={page <= 1}
        onClick={goToPage(page - 1)}
        title="Page précédente"
      >
        <PrevIcon />
      </IconButton>

      <div className={classes.page} data-e2e="pagination">{ page } / { lastPage }</div>

      <IconButton
        className={classes.icon}
        disabled={page >= lastPage}
        onClick={goToPage(page + 1)}
        title="Page suivante"
      >
        <NextIcon />
      </IconButton>

      <IconButton
        className={classes.icon}
        disabled={typeof lastPage !== 'number' || page >= lastPage}
        onClick={goToPage(lastPage as number)}
        title="Dernière page"
      >
        <LastIcon />
      </IconButton>

    </>
  );
};

export default Pagination;
