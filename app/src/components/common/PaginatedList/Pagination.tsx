import React from 'react';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstIcon from '@material-ui/icons/FirstPage';
import LastIcon from '@material-ui/icons/LastPage';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

type PaginationProps = {
  page: number;
  total?: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, total, pageSize, onPageChange }) => {
  // eslint-disable-next-line no-nested-ternary
  const lastPage = total === 0 ? 1 : (total ? Math.ceil(total / pageSize) : '-');

  const goToPage = (page: number) => () => onPageChange(page);

  return (
    <Grid container alignItems="center" justify="space-evenly">

      <IconButton
        disabled={page <= 1}
        onClick={goToPage(1)}
        title="Première page"
      >
        <FirstIcon />
      </IconButton>

      <IconButton
        disabled={page <= 1}
        onClick={goToPage(page - 1)}
        title="Page précédente"
      >
        <PrevIcon />
      </IconButton>

      <div role="Numéro de page">{ page } / { lastPage }</div>

      <IconButton
        disabled={page >= lastPage}
        onClick={goToPage(page + 1)}
        title="Page suivante"
      >
        <NextIcon />
      </IconButton>

      <IconButton
        disabled={typeof lastPage !== 'number' || page >= lastPage}
        onClick={goToPage(lastPage as number)}
        title="Dernière page"
      >
        <LastIcon />
      </IconButton>

    </Grid>
  );
};

export default Pagination;
