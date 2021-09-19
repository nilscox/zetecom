import { expect } from 'earljs';

import { createUser } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser } from '../../selectors';

import { logout } from './logout';

describe('logout', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('logs out', async () => {
    store.user = createUser();
    store.dependencies.userGateway.logout.resolvesToOnce(undefined);
    store.dependencies.routerGateway.push.returnsOnce(undefined);

    await store.dispatch(logout());

    expect(store.select(selectAuthenticatedUser)).toEqual(undefined);
    expect(store.dependencies.routerGateway.push).toHaveBeenCalledWith(['/connexion']);
  });
});
