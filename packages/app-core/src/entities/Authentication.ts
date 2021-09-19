export enum AuthenticationField {
  email = 'email',
  password = 'password',
  nick = 'nick',
}

export enum AuthenticationForm {
  requestAuthenticationLink = 'requestAuthenticationLink',
  login = 'login',
  signup = 'signup',
}

export class AuthenticationError extends Error {
  constructor(readonly status: number, readonly body: Record<string, unknown>) {
    super('Authentication error, status = ' + status);
  }
}
