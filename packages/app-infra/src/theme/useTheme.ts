import { useTheme as useEmotionTheme } from '@emotion/react';

import { Theme } from './theme';

export const useTheme = useEmotionTheme as () => Theme;
