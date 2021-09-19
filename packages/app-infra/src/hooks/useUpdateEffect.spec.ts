import { renderHook } from '@testing-library/react-hooks';
import { expect, mockFn } from 'earljs';

import useUpdateEffect from './useUpdateEffect';

describe('useUpdateEffect', () => {
  it('does not invoke the callback on the first render', () => {
    const cb = mockFn().returns(undefined);
    renderHook(() => useUpdateEffect(cb, []));

    expect(cb.calls).toBeAnArrayOfLength(0);
  });

  it('invokes the callback on the next renders', () => {
    const cb = mockFn().returns(undefined);
    const { rerender } = renderHook((dep = false) => useUpdateEffect(cb, [dep]));

    rerender(true);
    expect(cb.calls).toBeAnArrayOfLength(1);
  });
});
