```tsx
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onChange={e => setChecked(e.currentTarget.checked)} />;
```
