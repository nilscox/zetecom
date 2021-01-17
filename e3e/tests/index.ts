import 'mocha';
import 'mocha/mocha.css';

import chai from 'chai';
import chaiDom from 'chai-dom';
import { configure } from '@testing-library/dom';

import testea from 'testea';
import 'testea/testea.css';

const main = async () => {
  testea.setup();
  mocha.setup('bdd');
  chai.use(chaiDom);

  await import('./authentication');
  await import('./comment');
  await import('./comments-area');

  configure({
    // throwSuggestions: true,
    asyncUtilTimeout: 2000,
  });

  beforeEach(async function () {
    await this.iframe.clearCookies();
  });

  testea.run();
};

main().catch(console.error);
