```tsx
import { useHistory, Route } from 'react-router-dom';

const history = useHistory();

history.push('/connexion');

<Route path="/(connexion|inscription|connexion-par-email)">
  <AuthenticationForm
    loading={false}
    fieldErrors={{}}
    formError={null}
    clearFieldError={() => {}}
    onSubmit={() => {}}
  />
</Route>;
```

With errors

```tsx
import { useHistory, Route } from 'react-router-dom';

const history = useHistory();

history.push('/inscription');

const [type, setType] = React.useState('login');

const fieldErrors = {
  email: 'Cela ne ressemble pas à une adresse email',
  password: 'Ce mot de passe est trop faible',
  nick: 'Ce pseudo est déjà utilisé',
};

const formError = 'Combisaison email / mot de passe non valide';

<Route path="/(connexion|inscription|connexion-par-email)">
  <AuthenticationForm
    loading={false}
    fieldErrors={fieldErrors}
    formError={formError}
    clearFieldError={() => {}}
    onSubmit={() => {}}
  />
</Route>;
```
