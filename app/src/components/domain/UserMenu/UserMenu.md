Unauthenticated

```tsx
<UserMenu user={null} />
```

Authenticated

```tsx
import makeUser from 'src/test/makeUser';

<UserMenu user={makeUser({ nick: 'Doug Forcett' })} onLogout={() => {}} />;
```

Loading

```tsx
import makeUser from 'src/test/makeUser';

<UserMenu loading user={makeUser({ nick: 'Doug Forcett' })} onLogout={() => {}} />;
```
