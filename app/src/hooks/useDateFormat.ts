import { useCallback } from 'react';

import dayjs from 'dayjs';

export const DATE_FORMAT_DAY = 'DD MM YYYY';
export const DATE_FORMAT_DAY_HOUR = '[Le] DD MMMM YYYY [à] HH:mm';

const useDateFormat = (format?: string, utc = true) => {
  return useCallback((date: Date) => (utc ? dayjs.utc : dayjs)(date).format(format), [format, utc]);
};

export default useDateFormat;
