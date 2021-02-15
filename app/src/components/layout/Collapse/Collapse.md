Short text

```tsx
import { useState } from 'react';

const [visible, setVisible] = useState(true);

<>
  <button onClick={() => setVisible(v => !v)}>Visible: {String(visible)}</button>

  <Collapse in={visible}>
    <div style={{ margin: '10px 0' }}>content</div>
    <div>content</div>
    <div>content</div>
  </Collapse>
</>;
```

Long text

```tsx
import { useState } from 'react';

const [visible, setVisible] = useState(false);
const [lines, setLines] = useState(20);

<>
  <button onClick={() => setVisible(v => !v)}>Visible: {String(visible)}</button>
  <button onClick={() => setLines(lines => (lines + 5) % 30)}>lines: {lines}</button>

  <Collapse in={visible}>
    {Array(lines)
      .fill(null)
      .map((_, n) => (
        <div key={n}>{n + 1}</div>
      ))}
  </Collapse>
</>;
```
