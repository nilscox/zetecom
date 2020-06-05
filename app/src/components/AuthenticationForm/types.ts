import { FormState } from 'react-use-form-state';

export type Form = 'login' | 'signup' | 'emailLogin';

export type FormFields = {
  email: string;
  password?: string;
  nick?: string;
  didAcceptRules?: boolean;
};

export type AuthenticationFormState = FormState<FormFields>;
