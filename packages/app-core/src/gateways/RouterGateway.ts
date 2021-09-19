export interface RouterGateway {
  readonly pathname: string;

  push(pathname: string): void;

  openPopup(pathname: string): void;
  closePopup(): void;
}
