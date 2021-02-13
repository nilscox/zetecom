```tsx
const date = new Date();

const title = (
  <>
    Vous avez reçu une <strong>notification</strong>!
  </>
);

const text = (
  <>
    <p>Quelque chose s'est passé, et nous voulions vous en informer.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p>
  </>
);

<Notification date={date} title={title} text={text} markAsSeen={() => {}} />;
```

Seen

```tsx
const date = new Date();

const title = (
  <>
    Vous avez reçu une <strong>notification</strong>!
  </>
);

const text = (
  <>
    <p>Quelque chose s'est passé, et nous voulions vous en informer.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p>
  </>
);

<Notification seen date={date} title={title} text={text} />;
```
