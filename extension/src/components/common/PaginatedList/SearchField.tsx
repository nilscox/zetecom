import React, { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import TextField from '@material-ui/core/TextField';

type SearchFieldProps = {
  onSearch: (text: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  useEffect(() => {
    if (searchDebounced)
      onSearch(searchDebounced);
  }, [onSearch, searchDebounced]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      name="search"
      label="Rechercher..."
      onChange={e => setSearch(e.currentTarget.value)}
    />
  );
};

export default SearchField;
