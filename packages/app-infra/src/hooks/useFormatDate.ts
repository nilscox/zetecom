import { useCallback } from 'react';

import dayjs from 'dayjs';

import 'dayjs/locale/fr';

export const DATE_FORMAT_DAY = 'DD MM YYYY';
export const DATE_FORMAT_DAY_HOUR = '[Le] DD MMMM YYYY [à] HH[h]mm';

const useDateFormat = (format?: string) => {
  return useCallback((date: Date | string) => dayjs(date).locale('fr').format(format), [format]);
};

export default useDateFormat;
