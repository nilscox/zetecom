import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-debounce';

type SearchFieldProps = {
  onSearch: (text: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  useEffect(() => void onSearch(searchDebounced), [searchDebounced]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      label="Rechercher..."
      onChange={e => setSearch(e.currentTarget.value)}
    />
  );
};

export default SearchField;
