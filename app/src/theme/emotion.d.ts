import { Theme as MyTheme } from './theme';

import '@emotion/react';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MyTheme {}
}
