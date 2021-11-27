import { useEffect, useRef, useState } from 'react';

import {
  AuthenticationField,
  AuthenticationForm as AuthenticationFormEnum,
  clearAuthenticationErrors,
  selectAuthenticationField,
  selectAuthenticationFieldError,
  selectAuthenticationGlobalError,
  selectHasAuthenticationError,
  selectIsAuthenticating,
  setAuthenticationField,
  submitAuthenticationForm,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';

import { Button, ButtonProps } from '~/components/elements/Button/Button';
import { FormError } from '~/components/elements/FormError/FormError';
import { Input, InputProps } from '~/components/elements/Input/Input';
import { Link, WebsiteLink } from '~/components/elements/Link/Link';
import { Text } from '~/components/elements/Text/Text';
import { Box } from '~/components/layout/Box/Box';
import { Collapse } from '~/components/layout/Collapse/Collapse';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import useUpdateEffect from '~/hooks/useUpdateEffect';

const routes = {
  [AuthenticationFormEnum.requestAuthenticationLink]: '/lien-de-connexion',
  [AuthenticationFormEnum.login]: '/connexion',
  [AuthenticationFormEnum.signup]: '/inscription',
};

const getPath = (...forms: AuthenticationFormEnum[]) => {
  return `(/popup)?(${forms.map((form) => routes[form]).join('|')})`;
};

const useAuthenticationForm = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/popup/, '');

  for (const [form, path] of Object.entries(routes)) {
    if (path === pathname) {
      return form;
    }
  }

  throw new Error(`cannot map the current pathname "${location.pathname}" to an authentication form`);
};

const useIsAuthenticationForm = (...forms: AuthenticationFormEnum[]) => {
  const authenticationForm = useAuthenticationForm();

  return forms.some((form) => form === authenticationForm);
};

type AuthenticationFormProps = {
  className?: string;
};

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ className }) => {
  const {
    email: [email, emailError, setEmail],
    password: [password, passwordError, setPassword],
    nick: [nick, nickError, setNick],
  } = useAuthenticationFields();

  const [rulesAccepted, setRulesAccepted] = useState(false);

  const isAuthenticating = useAppSelector(selectIsAuthenticating);

  const globalError = useAppSelector(selectAuthenticationGlobalError);
  const hasError = useAppSelector(selectHasAuthenticationError);
  const [formRef, formValid] = useFormValidity(email, password, nick, rulesAccepted);
  const submitButtonDisabled = hasError || !formValid || isAuthenticating;

  const handleSubmit = useSubmitAuthenticationForm();

  return (
    <form ref={formRef} className={className} onSubmit={handleSubmit}>
      <TopMessage />
      <EmailField value={email} error={emailError} onTextChange={setEmail} />
      <PasswordField value={password} error={passwordError} onTextChange={setPassword} />
      <NickField value={nick} error={nickError} onTextChange={setNick} />
      <AuthenticationNavigation />
      <FormError error={globalError} consistentHeight />
      <AcceptRulesCheckbox checked={rulesAccepted} onChange={setRulesAccepted} />
      <SubmitButton disabled={submitButtonDisabled} loading={isAuthenticating} />
    </form>
  );
};

// value, error, setValue
type AuthenticationFieldProps = [string, string, (text: string) => void];

const useAuthenticationFields = () => {
  const dispatch = useDispatch();

  return Object.values(AuthenticationField).reduce(
    (obj, field) => ({
      ...obj,
      [field]: [
        useAppSelector(selectAuthenticationField, field),
        useAppSelector(selectAuthenticationFieldError, field),
        (text: string) => dispatch(setAuthenticationField(field, text)),
      ],
    }),
    {} as Record<AuthenticationField, AuthenticationFieldProps>,
  );
};

const useFormValidity = (email: string, password: string, nick: string, rulesAccepted: boolean) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(formRef.current?.checkValidity() ?? false);
  }, [email, password, nick, rulesAccepted, location.pathname]);

  useUpdateEffect(() => {
    dispatch(clearAuthenticationErrors());
  }, [location.pathname]);

  return [formRef, valid] as const;
};

const useSubmitAuthenticationForm = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitAuthenticationForm(pathname.startsWith('/popup') ? 'popup' : 'app'));
  };
};

const TopMessage: React.FC = () => (
  <Text as="p" marginBottom={5}>
    <Route path={getPath(AuthenticationFormEnum.login)}>
      Connectez-vous sur Zétécom pour interagir avec le reste de la communauté.
    </Route>
    <Route path={getPath(AuthenticationFormEnum.signup)}>
      Créez votre compte sur Zétécom. Vos{' '}
      <WebsiteLink href="/faq.html#donnees-personnelles">données personnelles</WebsiteLink> ne seront pas communiquées
      en dehors de la plateforme.
    </Route>
    <Route path={getPath(AuthenticationFormEnum.requestAuthenticationLink)}>
      Identifiez-vous sur Zétécom via un email contenant un lien de connexion sans mot de passe.
    </Route>
  </Text>
);

const EmailField: React.FC<InputProps> = (props) => (
  <Box marginY={2}>
    <Input outlined fullWidth consistentHeight required type="email" placeholder="Adresse email" {...props} />
  </Box>
);

const PasswordField: React.FC<InputProps> = (props) => {
  const visible = useIsAuthenticationForm(AuthenticationFormEnum.login, AuthenticationFormEnum.signup);

  return (
    <Collapse open={visible}>
      <Box marginY={2}>
        <Input
          outlined
          fullWidth
          consistentHeight
          required={visible}
          type="password"
          placeholder="Mot de passe"
          autoComplete="off"
          {...props}
        />
      </Box>
    </Collapse>
  );
};

const NickField: React.FC<InputProps> = (props) => {
  const visible = useIsAuthenticationForm(AuthenticationFormEnum.signup);

  return (
    <Collapse open={visible}>
      <Box marginY={2}>
        <Input outlined fullWidth consistentHeight required={visible} type="text" placeholder="Pseudo" {...props} />
      </Box>
    </Collapse>
  );
};

const navigationLinks = [
  {
    forms: [AuthenticationFormEnum.requestAuthenticationLink, AuthenticationFormEnum.signup],
    to: routes.login,
    label: 'Connexion',
  },
  {
    forms: [AuthenticationFormEnum.login],
    to: routes.signup,
    label: 'Créer un compte',
  },
  {
    forms: [AuthenticationFormEnum.login, AuthenticationFormEnum.signup],
    to: routes.requestAuthenticationLink,
    label: 'Mot de passe oublié',
  },
];

const AuthenticationNavigation: React.FC = () => {
  const location = useLocation();
  const isPopup = location.pathname.startsWith('/popup');

  return (
    <Flex direction="row" justifyContent="space-between" marginY={2} data-testid="navigation">
      {navigationLinks.map(({ forms, to, label }) => (
        <Route key={label} path={getPath(...forms)}>
          <Link to={(isPopup ? '/popup' : '') + to}>{label}</Link>
        </Route>
      ))}
    </Flex>
  );
};

type AcceptRulesCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckboxProps> = ({ checked, onChange }) => {
  const [displayWarning, setDisplayWarning] = useState(false);

  const matchSignup = useIsAuthenticationForm(AuthenticationFormEnum.signup);

  const handleChange = () => {
    if (!displayWarning) {
      setDisplayWarning(true);
    } else {
      onChange(!checked);
    }
  };

  return (
    <Collapse open={matchSignup}>
      <Box marginY={3}>
        <label>
          <Input required={matchSignup} type="checkbox" checked={checked} onChange={handleChange} />
          <Text marginLeft={3}>
            J'accepte <WebsiteLink href="/charte.html">la charte</WebsiteLink>.
          </Text>
        </label>
      </Box>

      <Collapse open={displayWarning}>
        <Box marginY={3}>
          {/* eslint-disable-next-line max-len */}
          Il est important que chaque membre ait pris connaissance de la charte. Si ce n'est pas encore fait, accordez{' '}
          <strong>5 minutes</strong> à sa lecture avant de vous inscrire.
        </Box>
      </Collapse>
    </Collapse>
  );
};

const SubmitButton: React.FC<ButtonProps> = (props) => (
  <Flex direction="row" justifyContent="center" marginTop={3}>
    <Button type="submit" {...props}>
      <Route path={getPath(AuthenticationFormEnum.login)}>Connexion</Route>
      <Route path={getPath(AuthenticationFormEnum.signup)}>Inscription</Route>
      <Route path={getPath(AuthenticationFormEnum.requestAuthenticationLink)}>Envoyer</Route>
    </Button>
  </Flex>
);
