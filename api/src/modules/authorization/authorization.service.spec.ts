import { User } from '../user/user.entity';

import { AuthorizationService } from './authorization.service';
import { Role } from './roles.enum';

describe('AuthorizationService', () => {
  const authorizationService = new AuthorizationService();

  describe('isAuthorized', () => {

    it('should authorize a user based on its roles', () => {
      const user: User = {
        roles: [Role.USER, Role.ADMIN],
      } as User;

      expect(authorizationService.isAuthorized(user, Role.USER)).toBe(true);
      expect(authorizationService.isAuthorized(user, Role.ADMIN)).toBe(true);
    });

    it('should not authorize a user based on its roles', () => {
      const user: User = {
        roles: [Role.USER],
      } as User;

      expect(authorizationService.isAuthorized(user, Role.ADMIN)).toBe(false);
    });

  });

});
