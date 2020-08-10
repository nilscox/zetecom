import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-debounce';

import useUpdateEffect from 'src/hooks/use-update-effect';

type SearchFieldProps = {
  onSearch: (text: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  useUpdateEffect(() => {
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
