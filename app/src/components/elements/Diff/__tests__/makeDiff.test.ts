import makeDiff, { group } from '../makeDiff';

describe('makeDiff', () => {
  describe('group', () => {
    it('should group similar chunks separated with spaces', () => {
      // prettier-ignore
      expect(
        group([
          { value: 'a', removed: true },
          { value: ' ' },
          { value: 'b', removed: true },
        ])
      ).toMatchObject([
        { value: 'a b', removed: true },
      ]);

      // prettier-ignore
      expect(
        group([
          { value: 'a', added: true },
          { value: ' ' },
          { value: 'b', added: true },
        ])
      ).toMatchObject([
        { value: 'a b', added: true },
      ]);

      // prettier-ignore
      expect(
        group([
          { value: 'a', added: true },
          { value: '     ' },
          { value: 'b', added: true },
        ])
      ).toMatchObject([
        { value: 'a     b', added: true },
      ]);

      // prettier-ignore
      expect(
        group([
          { value: 'a', added: true },
          { value: '     ' },
          { value: 'b', added: true },
          { value: ' ' },
          { value: 'c', added: true },
        ])
      ).toMatchObject([
        { value: 'a     b c', added: true },
      ]);
    });

    it('should not group', () => {
      // prettier-ignore
      expect(
        group([
          { value: 'a', added: true },
          { value: ' o ' },
          { value: 'b', added: true },
        ])
      ).toMatchObject([
        { value: 'a', added: true },
        { value: ' o ' },
        { value: 'b', added: true },
      ]);
    });
  });

  describe('makeDiff', () => {
    it('should group items', () => {
      const a = 'this is so nice';
      const b = 'this should have been nice';

      const lines = makeDiff(a, b, { simplify: true, group: true });

      expect(lines).toHaveLength(1);
      expect(lines[0]).toMatchObject([
        [{ value: 'this ' }, { value: 'is so', removed: true }, { value: ' nice' }],
        [{ value: 'this ' }, { value: 'should have been ', added: true }, { value: 'nice' }],
      ]);
    });
  });
});
