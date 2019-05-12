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
  error: any;
}

export type WormholeOutEvent = FetchMe;
export type WormholeInEvent = FetchMeSuccess | FetchMeFailure;

export default interface Wormhole {
  onEvent(type: string, callback: (event: WormholeInEvent) => void): void;
  postEvent(event: WormholeOutEvent): void;
}
