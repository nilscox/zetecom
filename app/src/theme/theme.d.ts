import {} from '@material-ui/core/styles/createPalette';

// declare module '@material-ui/core/styles/createBreakpoints' {
//   interface BreakpointOverrides {
//     xxs: true;
//     xs: true;
//     sm: true;
//     md: true;
//     lg: true;
//     xl: true;
//   }
// }

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {
    link: string;
    linkFocus: string;
    warning: string;
  }

  interface Palette {
    border: Pick<PaletteColor, 'main'>;
    selected: Pick<PaletteColor, 'main'>;
  }

  interface PaletteOptions {
    border: Pick<PaletteColor, 'main'>;
    selected: Pick<PaletteColor, 'main'>;
    // textWarning: TypeText;
  }
}
