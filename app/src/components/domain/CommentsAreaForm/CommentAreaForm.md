```tsx
const fieldErrors = {};
const clearFieldError = () => {};
const onCancel = () => console.log('cancel');
const onSubmit = console.log;

<CommentsAreaForm
  fieldErrors={fieldErrors}
  clearFieldError={clearFieldError}
  onCancel={onCancel}
  onSubmit={onSubmit}
/>;
```

With errors

```tsx
const fieldErrors = {
  title: "Le titre n'est pas assez long",
  url: 'Ce champ ne semble pas être une URL valide',
  publicationDate: 'La date de publication ne peut pas être dans le futur',
  author: 'Ce champs est requis',
};

const clearFieldError = field => console.log('clear error for field ' + field);
const onCancel = () => {};
const onSubmit = () => {};

<CommentsAreaForm
  fieldErrors={fieldErrors}
  clearFieldError={clearFieldError}
  onCancel={onCancel}
  onSubmit={onSubmit}
/>;
```
