import { renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import useDateFormat from 'src/hooks/useDateFormat';

describe('useDateFormat', () => {
  it('should format a date to iso utc string', () => {
    const {
      result: { current: format },
    } = renderHook(() => useDateFormat());

    expect(format(new Date(2020, 1, 10))).toBe('2020-02-10T00:00:00.000Z');
  });
});
