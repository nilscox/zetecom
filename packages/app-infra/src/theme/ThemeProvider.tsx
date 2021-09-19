import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { theme } from './index';

export const ThemeProvider: React.FC = (props) => <EmotionThemeProvider theme={theme} {...props} />;
