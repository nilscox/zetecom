import { AuthenticationError, AuthenticationField } from '../../../../entities';
import { isUndefined } from '../../../../shared/isUndefined';
import { createThunk } from '../../../../store/createThunk';
import { setAuthenticationFieldError, setAuthenticationGlobalError } from '../../actions';

export const handleAuthenticationError = createThunk(({ dispatch }, error: unknown) => {
  if (!(error instanceof AuthenticationError)) {
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = error.body;

  const fieldErrors: Record<AuthenticationField, string | undefined> = {
    email: undefined,
    password: undefined,
    nick: undefined,
  };

  let globalError: string | undefined = undefined;

  if (error.status === 400) {
    if (body.email?.isEmail) fieldErrors.email = "Format d'adresse email non valide";
    if (body.message === 'EMAIL_ALREADY_EXISTS') fieldErrors.email = 'Cette adresse est déjà utilisée';

    if (body.password?.minLength) fieldErrors.password = 'Ce mot de passe est trop court';
    if (body.password?.maxLength) fieldErrors.password = 'Ce mot de passe est trop long :o';
    if (body.message === 'PASSWORD_UNSECURE') fieldErrors.password = "Ce mot de passe n'est pas assez sécurisé";

    if (body.nick?.minLength) fieldErrors.nick = 'Ce pseudo est trop court';
    if (body.nick?.maxLength) fieldErrors.nick = 'Ce pseudo est trop long';
    if (body.message === 'NICK_ALREADY_EXISTS') fieldErrors.nick = 'Ce pseudo est déjà utilisé';
  }

  if (error.status === 401) {
    if (body.message === 'INVALID_CREDENTIALS') globalError = 'Combinaison email / mot de passe non valide';
    if (body.message === 'EMAIL_NOT_VALIDATED') fieldErrors.email = "Votre adresse email n'a pas été validée";
  }

  if (error.status === 403) {
    globalError = 'Vous êtes déjà connecté(e)';
  }

  if ([fieldErrors.email, fieldErrors.password, fieldErrors.nick, globalError].every(isUndefined)) {
    globalError = "Une erreur s'est produite";
  }

  if (globalError) {
    dispatch(setAuthenticationGlobalError(globalError));
  }

  for (const field of Object.values(AuthenticationField)) {
    dispatch(setAuthenticationFieldError(field, fieldErrors[field]));
  }
});
