/* eslint-disable max-lines */
import { act, renderHook } from '@testing-library/react-hooks';

import useEditableDataset from '../useEditableDataset';

function render<T>(input?: T[], onUpdate?: 'prepend' | 'append') {
  return renderHook((props) => useEditableDataset(props.input, props.onUpdate), {
    initialProps: { input, onUpdate },
  });
}

describe('useEditableDataset', () => {
  describe('initialize', () => {
    it('should initialize an undefined state', () => {
      const { result } = render();

      expect(result.current[0]).toEqual(undefined);
    });

    it('should initialize an empty state', () => {
      const { result } = render([]);

      expect(result.current[0]).toEqual([]);
    });

    it('should initialize a non-empty state', () => {
      const { result } = render(['hello']);

      expect(result.current[0]).toEqual(['hello']);
    });
  });

  describe('prepend', () => {
    it('should prepend to an undefined state', () => {
      const { result } = render<string>();

      act(() => result.current[1].prepend('hello'));
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should prepend to an empty state', () => {
      const { result } = render<string>([]);

      act(() => result.current[1].prepend('hello'));
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should prepend items', () => {
      const { result } = render<string>();
      const { prepend } = result.current[1];

      act(() => prepend('hello'));
      expect(result.current[0]).toEqual(['hello']);

      act(() => prepend('world'));
      expect(result.current[0]).toEqual(['world', 'hello']);

      act(() => prepend('how', 'are', 'you'));
      expect(result.current[0]).toEqual(['how', 'are', 'you', 'world', 'hello']);

      act(() => prepend());
      expect(result.current[0]).toEqual(['how', 'are', 'you', 'world', 'hello']);
    });
  });

  describe('append', () => {
    it('should append to an undefined state', () => {
      const { result } = render<string>();

      act(() => result.current[1].append('hello'));
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should append to an empty state', () => {
      const { result } = render<string>([]);

      act(() => result.current[1].append('hello'));
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should append items', () => {
      const { result } = render<string>();
      const { append } = result.current[1];

      act(() => append('hello'));
      expect(result.current[0]).toEqual(['hello']);

      act(() => append('world'));
      expect(result.current[0]).toEqual(['hello', 'world']);

      act(() => append('how', 'are', 'you'));
      expect(result.current[0]).toEqual(['hello', 'world', 'how', 'are', 'you']);

      act(() => append());
      expect(result.current[0]).toEqual(['hello', 'world', 'how', 'are', 'you']);
    });
  });

  describe('replace', () => {
    it('should not replace items on an undefined state', () => {
      const { result } = render();
      const { replace } = result.current[1];

      act(() => replace('hello', 'world'));
      expect(result.current[0]).toEqual(undefined);
    });

    it('should not replace items on an empty state', () => {
      const { result } = render([]);
      const { replace } = result.current[1];

      act(() => replace('hello', 'world'));
      expect(result.current[0]).toEqual([]);
    });

    it('should replace items', () => {
      const { result } = render(['hello']);
      const { replace } = result.current[1];

      act(() => replace('hello', 'world'));
      expect(result.current[0]).toEqual(['world']);

      act(() => replace('foo', 'bar'));
      expect(result.current[0]).toEqual(['world']);
    });
  });

  describe('remove', () => {
    it('should not remove items on an undefined state', () => {
      const { result } = render();
      const { remove } = result.current[1];

      act(() => remove('hello'));
      expect(result.current[0]).toEqual(undefined);
    });

    it('should not remove items on an empty state', () => {
      const { result } = render([]);
      const { remove } = result.current[1];

      act(() => remove('hello'));
      expect(result.current[0]).toEqual([]);
    });

    it('should remove items', () => {
      const { result } = render(['hello', 'world']);
      const { remove } = result.current[1];

      act(() => remove('hello'));
      expect(result.current[0]).toEqual(['world']);

      act(() => remove('foo'));
      expect(result.current[0]).toEqual(['world']);
    });
  });

  describe('prepend on update', () => {
    it('should prepend on update from an undefined state', () => {
      const { result, rerender } = render(undefined, 'prepend');

      rerender({ input: ['hello'], onUpdate: 'prepend' });
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should prepend on update', () => {
      const { result, rerender } = render(['hello'], 'prepend');

      rerender({ input: ['world'], onUpdate: 'prepend' });
      expect(result.current[0]).toEqual(['world', 'hello']);

      rerender({ input: ['how', 'are', 'you'], onUpdate: 'prepend' });
      expect(result.current[0]).toEqual(['how', 'are', 'you', 'world', 'hello']);
    });
  });

  describe('append on update', () => {
    it('should append on update from an undefined state', () => {
      const { result, rerender } = render(undefined, 'append');

      rerender({ input: ['hello'], onUpdate: 'append' });
      expect(result.current[0]).toEqual(['hello']);
    });

    it('should append on update', () => {
      const { result, rerender } = render(['hello'], 'append');

      rerender({ input: ['world'], onUpdate: 'append' });
      expect(result.current[0]).toEqual(['hello', 'world']);

      rerender({ input: ['how', 'are', 'you'], onUpdate: 'append' });
      expect(result.current[0]).toEqual(['hello', 'world', 'how', 'are', 'you']);
    });
  });

  describe('prepend and append on update', () => {
    it('should prepend and append on update', () => {
      const { result, rerender } = render(['hello'], 'prepend');

      rerender({ input: ['world'], onUpdate: 'prepend' });
      expect(result.current[0]).toEqual(['world', 'hello']);

      rerender({ input: ['how', 'are', 'you'], onUpdate: 'append' });
      expect(result.current[0]).toEqual(['world', 'hello', 'how', 'are', 'you']);
    });
  });
});
