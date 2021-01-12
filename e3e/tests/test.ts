import { expect } from 'chai';
import { wait } from './utils';

mocha.timeout(400);

describe.skip('outer describe', () => {
  beforeEach(async () => {
    await wait(100);
  });

  describe('inner describe 1', () => {
    beforeEach(async () => {
      await wait(100);
    });

    it('should pass', async () => {
      await wait(100);
      expect(1).to.eql(1);
    });

    it('should fail', async () => {
      await wait(100);
      expect(1).to.eql(123);
    });

    it('should timeout', async () => {
      await wait(500);
      expect(1).to.eql(1);
    });
  });

  describe('inner describe 2', () => {
    before(async () => {
      await wait(100);
    });

    it('should also pass', async () => {
      await wait(100);
      expect(1).to.eql(1);
    });
  });
});
