export type Action<Type extends string> = {
  type: Type;
};

export type ActionWithPayload<Type extends string, Payload> = Action<Type> & {
  payload: Payload;
};

export function createAction<Type extends string>(type: Type): Action<Type>;

export function createAction<Type extends string, Payload>(
  type: Type,
  payload: Payload,
): ActionWithPayload<Type, Payload>;

export function createAction<Type extends string, Payload>(type: Type, payload?: Payload) {
  if (typeof payload !== 'undefined') {
    return { type, payload };
  }

  return { type };
}
