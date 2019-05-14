import User from './User';

interface BaseEvent {
  type: string;
}

export interface FetchMe extends BaseEvent {
  type: 'FETCH_ME';
}

export interface FetchMeSuccess extends BaseEvent {
  type: 'FETCH_ME_SUCCESS';
  user: User;
}

export interface FetchMeFailure extends BaseEvent {
  type: 'FETCH_ME_FAILURE';
  error: object;
}

export interface Login extends BaseEvent {
  type: 'LOGIN';
  email: string;
  password: string;
}

export interface LoginSuccess extends BaseEvent {
  type: 'LOGIN_SUCCESS';
  user: User;
}

export interface LoginFailure extends BaseEvent {
  type: 'LOGIN_FAILURE';
  error: object;
}

export interface Logout extends BaseEvent {
  type: 'LOGOUT';
}

export interface LogoutSuccess extends BaseEvent {
  type: 'LOGOUT_SUCCESS';
}

export interface LogoutFailure extends BaseEvent {
  type: 'LOGOUT_FAILURE';
  error: object;
}

export interface Signup extends BaseEvent {
  type: 'SIGNUP';
  email: string;
  password: string;
  nick: string;
}

export interface SignupSuccess extends BaseEvent {
  type: 'SIGNUP_SUCCESS';
  user: User;
}

export interface SignupFailure extends BaseEvent {
  type: 'SIGNUP_FAILURE';
  error: object;
}

export type WormholeOutEvent = FetchMe | Login | Logout | Signup;
export type WormholeInEvent =
  | FetchMeSuccess
  | FetchMeFailure
  | LoginSuccess
  | LoginFailure
  | LogoutSuccess
  | LogoutFailure
  | SignupSuccess
  | SignupFailure;

export default interface Wormhole {

  onEvent<T extends WormholeInEvent>(
    type: T['type'],
    callback: (event: T) => void
  ): void;

  postEvent(event: WormholeOutEvent): void;

}
