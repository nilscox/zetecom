import { Demo } from '~/demos';
import { dougForcett } from '~/fixtures';

import { AuthenticationForm } from './AuthenticationForm';

export const authenticationForm: Demo = {
  prepare: ({ deps: { routerGateway, userGateway } }) => {
    userGateway.credentials.set(dougForcett, { email: dougForcett.email, password: 'p4ssword' });
    routerGateway.push('/connexion');
  },
  render: () => <AuthenticationForm />,
};
