import { PaletteColorOptions } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    highlight: PaletteColor;
    border: PaletteColor;
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    highlight: PaletteColorOptions;
    border: PaletteColorOptions;
  }
}

export {};
