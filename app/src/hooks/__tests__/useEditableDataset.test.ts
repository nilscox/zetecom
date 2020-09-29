import { act, renderHook } from '@testing-library/react-hooks';

import useEditableDataset from '../useEditableDataset';

describe('useEditableDataset', () => {
  it('should initialize an empty dataset', () => {
    const { result } = renderHook(() => useEditableDataset());
    const [dataset] = result.current;

    expect(dataset).toEqual(undefined);
  });

  it('should initialize a non-empty dataset', () => {
    const { result } = renderHook(() => useEditableDataset(['hello']));
    const [dataset] = result.current;

    expect(dataset).toEqual(['hello']);
  });

  it('should prepend items', () => {
    const { result } = renderHook(() => useEditableDataset<string>());
    let [dataset, { prepend }] = result.current;

    act(() => prepend('hello'));
    [dataset, { prepend }] = result.current;

    expect(dataset).toEqual(['hello']);

    act(() => prepend('world'));
    [dataset, { prepend }] = result.current;

    expect(dataset).toEqual(['world', 'hello']);

    act(() => prepend('how', 'are', 'you'));
    [dataset, { prepend }] = result.current;

    expect(dataset).toEqual(['how', 'are', 'you', 'world', 'hello']);

    act(() => prepend());
    [dataset, { prepend }] = result.current;

    expect(dataset).toEqual(['how', 'are', 'you', 'world', 'hello']);
  });

  it('should append items', () => {
    const { result } = renderHook(() => useEditableDataset<string>());
    let [dataset, { append }] = result.current;

    act(() => append('hello'));
    [dataset, { append }] = result.current;

    expect(dataset).toEqual(['hello']);

    act(() => append('world'));
    [dataset, { append }] = result.current;

    expect(dataset).toEqual(['hello', 'world']);

    act(() => append('how', 'are', 'you'));
    [dataset, { append }] = result.current;

    expect(dataset).toEqual(['hello', 'world', 'how', 'are', 'you']);

    act(() => append());
    [dataset, { append }] = result.current;

    expect(dataset).toEqual(['hello', 'world', 'how', 'are', 'you']);
  });

  it('should replace items', () => {
    const input = ['hello'];
    const { result } = renderHook(() => useEditableDataset(input));
    let [dataset, { replace }] = result.current;

    act(() => replace('hello', 'world'));
    [dataset, { replace }] = result.current;

    expect(dataset).toEqual(['world']);

    act(() => replace('foo', 'bar'));
    [dataset, { replace }] = result.current;

    expect(dataset).toEqual(['world']);
  });

  it('should remove items', () => {
    const input = ['hello', 'world'];
    const { result } = renderHook(() => useEditableDataset(input));
    let [dataset, { remove }] = result.current;

    act(() => remove('hello'));
    [dataset, { remove }] = result.current;

    expect(dataset).toEqual(['world']);

    act(() => remove('foo'));
    [dataset, { remove }] = result.current;

    expect(dataset).toEqual(['world']);

    act(() => remove('world'));
    [dataset, { remove }] = result.current;

    expect(dataset).toEqual([]);
  });

  it('should prepend on update', () => {
    const { result, rerender } = renderHook((input: string[]) => useEditableDataset(input, 'prepend'), {
      initialProps: ['hello'],
    });

    rerender(['world']);

    expect(result.current[0]).toEqual(['world', 'hello']);

    rerender();

    expect(result.current[0]).toEqual(['world', 'hello']);
  });

  it('should append on update', () => {
    const { result, rerender } = renderHook((input: string[]) => useEditableDataset(input, 'append'), {
      initialProps: ['hello'],
    });

    rerender(['world']);

    expect(result.current[0]).toEqual(['hello', 'world']);

    rerender();

    expect(result.current[0]).toEqual(['hello', 'world']);
  });
});
