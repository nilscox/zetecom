```tsx
import makeUser from 'src/test/makeUser';

const user = makeUser({ nick: 'Doug Forcett' });

const onSubmit = text => console.log('submit', text);

<CommentForm author={user} placedolder="Composez votre message..." submitting={false} onSubmit={onSubmit} />;
```
