Unauthenticated

```tsx
<UserMenu user={null} />
```

Authenticated

```tsx
import makeUser from 'src/test/makeUser';

const user = makeUser({ nick: 'Doug Forcett' });

<UserMenu user={user} onLogout={() => {}} />;
```