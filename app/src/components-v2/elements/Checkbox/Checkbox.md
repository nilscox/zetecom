```tsx
const [checked, setChecked] = React.useState(false);

<Checkbox checked={checked} onChange={e => setChecked(e.currentTarget.checked)} />;
```
