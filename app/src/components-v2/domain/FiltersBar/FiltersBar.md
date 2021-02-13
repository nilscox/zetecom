```tsx
import { useState } from 'react';

import { SortType } from 'src/types/SortType';

const [search, setSearch] = useState('');
const [sort, setSort] = useState(SortType.DATE_ASC);
const [page, setPage] = useState(1);

<FiltersBar
  search={search}
  sort={sort}
  page={page}
  totalPages={6}
  onSearch={setSearch}
  onSort={setSort}
  onPageChange={setPage}
/>;
```
