import { Theme as ExactTheme } from './theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ExactTheme {}
}
