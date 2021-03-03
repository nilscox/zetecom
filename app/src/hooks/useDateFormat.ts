import { useCallback } from 'react';

import dayjs from 'dayjs';

export const DATE_FORMAT_DAY = 'DD MM YYYY';
export const DATE_FORMAT_DAY_HOUR = '[Le] DD MMMM YYYY [à] HH:mm';

const useDateFormat = (format?: string) => {
  return useCallback((date: Date | string) => dayjs.utc(date).format(format), [format]);
};

export default useDateFormat;
