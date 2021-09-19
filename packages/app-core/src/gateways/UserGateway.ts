import { AuthenticatedUserDto, NotificationDto } from '../entities';
import { Paginated } from '../shared/paginated';

export interface UserGateway {
  login(email: string, password: string): Promise<AuthenticatedUserDto>;
  signup(
    email: string,
    password: string,
    nick: string,
  ): Promise<AuthenticatedUserDto & { requiresEmailValidation: boolean }>;
  requestAuthenticationLink(email: string): Promise<void>;
  logout(): Promise<void>;
  validateEmail(token: string): Promise<AuthenticatedUserDto>;
  changePassword(password: string): Promise<void>;
  authenticateWithToken(token: string): Promise<AuthenticatedUserDto>;
  fetchAuthenticatedUser(): Promise<AuthenticatedUserDto | undefined>;
  fetchUnseenNotificationsCount(): Promise<number>;
  fetchUserNotifications(): Promise<Paginated<NotificationDto>>;
  markNotificationAsSeen(notificationId: string): Promise<void>;
}
