import {
  AuthenticatedUserDto,
  AuthenticationError,
  createAuthenticatedUser,
  GetState,
  Notification,
  Paginated,
  paginated,
  selectAuthenticatedUser,
  UserGateway,
} from '@zetecom/app-core';

import { execute } from './execute';

export type Credential = {
  email: string;
  password: string;
};

export class StubUserGateway implements UserGateway {
  public credentials = new Map<AuthenticatedUserDto, Credential>();

  public getState!: GetState;

  async login(email: string, password: string): Promise<AuthenticatedUserDto> {
    return execute({
      log: ['login', { email, password: this.mask(password) }],
      then: () => this.executeLogin(email, password),
    });
  }

  async signup(
    email: string,
    password: string,
    nick: string,
  ): Promise<AuthenticatedUserDto & { requiresEmailValidation: boolean }> {
    return execute({
      log: ['signup', { email, password, nick }],
      then: () => this.executeSignup(email, password, nick),
    });
  }

  async requestAuthenticationLink(email: string): Promise<void> {
    return execute({
      log: ['request authentication link', { email }],
    });
  }

  async logout(): Promise<void> {
    return execute({
      log: ['logout'],
    });
  }

  private mask(str: string) {
    return str
      .split('')
      .map(() => '*')
      .join('');
  }

  private validateEmailFormat(email: string) {
    if (!/[-a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/.exec(email)) {
      throw new AuthenticationError(400, { email: { isEmail: 'email must be an email' } });
    }
  }

  private findUser(match: { email?: string; password?: string; nick?: string }) {
    const user = Array.from(this.credentials.entries()).find(([user, cred]) =>
      [
        match.email === undefined || cred.email === match.email,
        match.password === undefined || cred.password === match.password,
        match.nick === undefined || user.nick === match.nick,
      ].every(Boolean),
    );

    if (user) {
      return user[0];
    }
  }

  private executeLogin(email: string, password: string) {
    if (selectAuthenticatedUser(this.getState())) {
      throw new AuthenticationError(403, {});
    }

    this.validateEmailFormat(email);

    const user = this.findUser({ email, password });

    if (!user) {
      throw new AuthenticationError(401, { message: 'INVALID_CREDENTIALS' });
    }

    return user;
  }

  private executeSignup(email: string, password: string, nick: string) {
    this.validateEmailFormat(email);

    if (nick.length <= 2 || password.length <= 2) {
      throw new AuthenticationError(400, {
        nick: nick.length <= 2 ? { minLength: 'error' } : undefined,
        password: password.length <= 2 ? { minLength: 'error' } : undefined,
      });
    }

    if (password === email || password === nick) {
      throw new AuthenticationError(400, { message: 'PASSWORD_UNSECURE' });
    }

    if (this.findUser({ email })) {
      throw new AuthenticationError(400, { message: 'EMAIL_ALREADY_EXISTS' });
    }

    if (this.findUser({ nick })) {
      throw new AuthenticationError(400, { message: 'NICK_ALREADY_EXISTS' });
    }

    return {
      requiresEmailValidation: false,
      ...createAuthenticatedUser({ nick }),
    };
  }

  async fetchAuthenticatedUser(): Promise<AuthenticatedUserDto | undefined> {
    return;
  }

  async validateEmail(): Promise<AuthenticatedUserDto> {
    throw new AuthenticationError(400, { message: 'USER_EMAIL_TOKEN_NOT_FOUND' });
  }

  async changePassword(password: string): Promise<void> {
    return execute({
      log: ['change password', { password }],
    });
  }

  async authenticateWithToken(): Promise<AuthenticatedUserDto> {
    throw new AuthenticationError(401, { message: 'INVALID_EMAIL_LOGIN_TOKEN' });
  }

  notifications: Notification[] = [];

  async fetchUnseenNotificationsCount(): Promise<number> {
    return 0;
  }

  async fetchUserNotifications(): Promise<Paginated<Notification>> {
    return paginated(this.notifications);
  }

  async markNotificationAsSeen(notificationId: string): Promise<void> {
    return execute({
      log: ['markNotificationAsSeen', { notificationId }],
    });
  }
}
