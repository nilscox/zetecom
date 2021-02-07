```tsx
import { toast } from 'react-toastify';

<>
  <ToastContainer />

  <button onClick={() => toast.success("I'm full!")}>Success</button>
  <button onClick={() => toast.info('I want to eat a banana.')}>Info</button>
  <button onClick={() => toast.warning("There's only one banana left...")}>Warning</button>
  <button onClick={() => toast.error('There is no banana anymore.')}>Error</button>
</>;
```
