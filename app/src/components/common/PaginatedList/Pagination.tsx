import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstIcon from '@material-ui/icons/FirstPage';
import LastIcon from '@material-ui/icons/LastPage';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

type PaginationProps = {
  page: number;
  totalPages?: number | '-';
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
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

      <Typography role="Numéro de page">{ page } / { totalPages }</Typography>

      <IconButton
        disabled={page >= totalPages}
        onClick={goToPage(page + 1)}
        title="Page suivante"
      >
        <NextIcon />
      </IconButton>

      <IconButton
        disabled={typeof totalPages !== 'number' || page >= totalPages}
        onClick={goToPage(totalPages as number)}
        title="Dernière page"
      >
        <LastIcon />
      </IconButton>

    </Grid>
  );
};

export default Pagination;
