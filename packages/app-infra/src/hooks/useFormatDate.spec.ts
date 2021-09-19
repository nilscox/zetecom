import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'earljs';

import useDateFormat, { DATE_FORMAT_DAY, DATE_FORMAT_DAY_HOUR } from './useFormatDate';

describe('useFormatDate', () => {
  const render = (format: string) => renderHook(() => useDateFormat(format)).result.current;

  it('formats a date to day format', () => {
    expect(render(DATE_FORMAT_DAY)('2020-02-10')).toEqual('10 02 2020');
    expect(render(DATE_FORMAT_DAY)(new Date(2020, 1, 10))).toEqual('10 02 2020');
  });

  it('formats a date to day and time format', () => {
    expect(render(DATE_FORMAT_DAY_HOUR)(new Date(2020, 1, 10, 12, 55))).toEqual('Le 10 février 2020 à 12h55');
  });
});
