import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import Input from 'src/components/Input';
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
    <Input
      fullWidth
      consistentHeight={false}
      variant="outlined"
      placeholder="Rechercher..."
      name="search"
      onChange={e => setSearch(e.currentTarget.value)}
    />
  );
};

export default SearchField;
