```tsx
import { useState } from 'react';

const [visible, setVisible] = useState(true);

<>
  <button onClick={() => setVisible(v => !v)}>Visible: {String(visible)}</button>

  <Fade in={visible}>
    <div>content</div>
    <div>content</div>
    <div>content</div>
  </Fade>
</>;
```
