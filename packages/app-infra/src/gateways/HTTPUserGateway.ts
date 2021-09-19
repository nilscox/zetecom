import { AuthenticatedUserDto, AuthenticationError, NotificationDto, Paginated, UserGateway } from '@zetecom/app-core';

import { HttpAdapter } from './adapters/HttpAdapter';
import { APINotificationDto, transformNotification } from './api/APINotificationDto';
import { APIPaginated } from './api/APIPaginated';
import { APIUserDto, transformUser } from './api/APIUserDto';

export class HTTPUserGateway implements UserGateway {
  constructor(private readonly http: HttpAdapter) {}

  async login(email: string, password: string): Promise<AuthenticatedUserDto> {
    const [body, { status }] = await this.http.post<APIUserDto>('/api/auth/login', {
      expectedStatus: [200, 400, 401],
      body: { email, password },
    });

    if (status !== 200) {
      throw new AuthenticationError(status, body);
    }

    return transformUser(body);
  }

  async signup(
    email: string,
    password: string,
    nick: string,
  ): Promise<AuthenticatedUserDto & { requiresEmailValidation: boolean }> {
    const [body, { status }] = await this.http.post<APIUserDto & { requiresEmailValidation: boolean }>(
      '/api/auth/signup',
      {
        expectedStatus: [201, 400, 401],
        body: { email, password, nick },
      },
    );

    if (status !== 201) {
      throw new AuthenticationError(status, body);
    }

    return {
      requiresEmailValidation: body.requiresEmailValidation,
      ...transformUser(body),
    };
  }

  async requestAuthenticationLink(email: string): Promise<void> {
    const [body, { status }] = await this.http.post<APIUserDto>('/api/auth/ask-email-login', {
      expectedStatus: [204, 400],
      body: { email },
    });

    if (status !== 204) {
      throw new AuthenticationError(status, body);
    }
  }

  async logout(): Promise<void> {
    await this.http.post('/api/auth/logout', { expectedStatus: 204 });
  }

  async validateEmail(token: string): Promise<AuthenticatedUserDto> {
    const [body, { status }] = await this.http.post<APIUserDto>(`/api/auth/validate-email/${token}`, {
      expectedStatus: [200, 400],
    });

    if (status !== 200) {
      throw new AuthenticationError(status, body);
    }

    return transformUser(body);
  }

  async changePassword(password: string): Promise<void> {
    const [body, { status }] = await this.http.put<Record<string, unknown>>('/api/auth/change-password', {
      expectedStatus: [200, 400],
      body: { password },
    });

    if (status !== 200) {
      throw new AuthenticationError(status, body);
    }
  }

  async authenticateWithToken(token: string): Promise<AuthenticatedUserDto> {
    const [body, { status }] = await this.http.post<APIUserDto>('/api/auth/email-login', {
      expectedStatus: [200, 401],
      body: { token },
    });

    if (status !== 200) {
      throw new AuthenticationError(status, body);
    }

    return transformUser(body);
  }

  async fetchUnseenNotificationsCount(): Promise<number> {
    const [{ count }] = await this.http.get<{ count: number }>('/api/notification/me/count');

    return count;
  }

  async fetchUserNotifications(): Promise<Paginated<NotificationDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APINotificationDto>>('/api/notification/me');

    return {
      results: items.map(transformNotification),
      total,
    };
  }

  async fetchAuthenticatedUser(): Promise<AuthenticatedUserDto | undefined> {
    const [body, { status }] = await this.http.get<APIUserDto>('/api/auth/me', { expectedStatus: [200, 403] });

    if (status === 200) {
      return transformUser(body);
    }
  }

  async markNotificationAsSeen(notificationId: string): Promise<void> {
    await this.http.post(`/api/notification/${notificationId}/seen`, {
      expectedStatus: 204,
    });
  }
}
