import { Demo } from '~/demos';

import { UserMenu } from '../UserMenu/UserMenu';

import { Header } from './Header';

export const header: Demo = {
  render: () => <Header right={<UserMenu />} />,
};
