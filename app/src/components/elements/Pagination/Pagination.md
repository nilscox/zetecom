```tsx
import { useState } from 'react';

const [page, setPage] = useState(4);

<Pagination page={page} total={6} onPageChange={setPage} />;
```
