const messages = {
  'INVALID_CREDENTIALS': 'combinaison email / mot de passe non valide',
  'USER_EMAIL_INVALID_FORMAT': 'format d\'adresse email non valide',
  'USER_EMAIL_ALREADY_EXISTS': 'adresse déjà utilisée',
  'USER_PASSWORD_TOO_SHORT': 'mot de passe trop court',
  'USER_PASSWORD_TOO_LONG': 'mot de passe trop long',
  'INFORMATION_TITLE_TOO_SHORT': 'titre trop court',
  'INFORMATION_URL_ALREADY_EXISTS': 'url déjà existante',
  'CONDITIONS_MUST_BE_CHECKED': 'Vous devez lire et accepter les conditions',
};

export const getErrorMessage = key => messages[key] || key;
