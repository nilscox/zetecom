export interface NotificationGateway {
  success(text: string): void;
  info(text: string): void;
  warning(text: string): void;
  error(text: string): void;
}
