Fallback loader

```tsx
import { useState } from 'react';

const [loading, setLoading] = useState(true);

<>
  <div>
    <button onClick={() => setLoading(v => !v)}>Loading: {String(loading)}</button>
  </div>
  <Fallback when={loading} render={() => 'content'} />
</>;
```

Fallback text

```tsx
import { useState } from 'react';

const [data, setData] = useState([]);

<>
  <div>
    <button onClick={() => setData(d => (d.length ? [] : [1, 2, 3]))}>data: [{data.join(', ')}]</button>
  </div>
  <Fallback
    when={data.length === 0}
    fallback="There is no data"
    render={() => (
      <ul>
        {data.map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    )}
  />
</>;
```
