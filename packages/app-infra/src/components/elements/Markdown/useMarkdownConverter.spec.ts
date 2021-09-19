import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'earljs';

import useMarkdownConverter from './useMarkdownConverter';

describe('useMarkdownConverter', () => {
  it('transforms some text in markdown to html', () => {
    const { result } = renderHook(() => useMarkdownConverter());

    expect(result.current('some *markdown*')).toEqual('<p>some <em>markdown</em></p>');
  });

  it('handles exponentiation syntaxe', () => {
    const { result } = renderHook(() => useMarkdownConverter());

    expect(result.current('to be^75')).toEqual('<p>to be<sup>75</sup></p>');
    expect(result.current('to be^75or not to be')).toEqual('<p>to be<sup>75</sup>or not to be</p>');
  });

  it('handles text highlighting', () => {
    const { result } = renderHook(() => useMarkdownConverter('science'));

    expect(result.current('I like science')).toEqual('<p>I like <mark>science</mark></p>');

    expect(result.current('I like [science](https://science.stuff)')).toEqual(
      expect.stringMatching(/href="https:\/\/science\.stuff".*<mark>science<\/mark>/),
    );
  });
});
