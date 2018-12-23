export const classList = (...arr) => {
  const result = [];

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] instanceof Array)
      result.push(classList(...arr[i]));
    else if (typeof arr[i] === 'string')
      result.push(arr[i]);
  }

  return result.join(' ').replace(/  +/g, ' ').trim();
};

const errors = {
  INVALID_CREDENTIALS: 'Combinaison email / mot de passe invalide',
  EMAIL_ALREADY_EXISTS: 'Cette adresse email est déjà enregistrée',
  isEmail: 'Format d\'adresse email invailde',
  minLength: 'Ce champ est trop court',
  maxLength: 'Ce champ est trop long',
};

export const getErrorMessage = key => errors[key];
