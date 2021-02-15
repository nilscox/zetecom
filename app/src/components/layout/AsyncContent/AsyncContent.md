```tsx
import { useState } from 'react';

const [loading, setLoading] = useState(true);

<>
  <div>
    <button onClick={() => setLoading(v => !v)}>Loading: {String(loading)}</button>
  </div>
  <AsyncContent loading={loading} render={() => 'content'} />
</>;
```
