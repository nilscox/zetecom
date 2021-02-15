Dialog with a simple text

```tsx
import { useState } from 'react';

const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open dialog</button>
  <Dialog open={open} onClose={() => setOpen(false)}>
    Hello, this is a dialog.
  </Dialog>
</>;
```

Dialog with a title and buttons

```tsx
import { useState } from 'react';

import Button from '../Button/Button';

import { DialogActions, DialogContent, DialogTitle } from './Dialog';

const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open dialog</button>

  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle>This is a title</DialogTitle>

    <DialogContent>Do you like it?</DialogContent>

    <DialogActions>
      <Button>Yes!</Button>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
    </DialogActions>
  </Dialog>
</>;
```

Confirm dialog

```tsx
import { useState } from 'react';

import Button from '../Button/Button';

import { ConfirmDialog } from './Dialog';

const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen(true)}>Open dialog</button>

  <ConfirmDialog
    open={open}
    cancel="Nooooo!"
    confirm="Yes, I'm sure"
    onCancel={() => setOpen(false)}
    onConfirm={() => setOpen(false)}
    title="Perform this action"
  >
    This action is permanent, and cannot be undone. Do you wish to continue?
  </ConfirmDialog>
</>;
```
