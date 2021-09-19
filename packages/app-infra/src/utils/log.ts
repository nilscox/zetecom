import { inspect } from 'util';

// eslint-disable-next-line no-console
export const log = (obj: unknown) => console.log(inspect(obj, false, null, true));
