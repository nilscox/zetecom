```tsx
import makeUser from 'src/test/makeUser';

const user = makeUser({ nick: 'Doug Forcett' });

<CommentHeader author={user} edited={true} date={new Date()} onEdit={() => {}} onReport={() => {}} />;
```
