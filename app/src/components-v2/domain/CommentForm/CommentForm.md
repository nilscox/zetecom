```tsx
import makeUser from 'src/test/makeUser';

const user = makeUser({ nick: 'Doug Forcett' });

<CommentForm author={user} placedolder="Composez votre message..." submitting={false} onSubmit={() => {}} />;
```
