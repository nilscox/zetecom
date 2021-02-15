```tsx
const [type, setType] = React.useState('login');

<>
  <select value={type} onChange={e => setType(e.currentTarget.value)}>
    <option value="login">login</option>
    <option value="signup">signup</option>
    <option value="emailLogin">emailLogin</option>
  </select>

  <hr />

  <AuthenticationForm type={type} fieldErrors={{}} onSubmit={() => {}} />
</>;
```

With errors

```tsx
const [type, setType] = React.useState('login');

const fieldErrors = {
  email: 'Cela ne ressemble pas à une adresse email',
  password: 'Ce mot de passe est trop faible',
  nick: 'Ce pseudo est déjà utilisé',
};

const formError = 'Combisaison email / mot de passe non valide';

<>
  <AuthenticationForm type="signup" fieldErrors={fieldErrors} formError={formError} onSubmit={() => {}} />
</>;
```
