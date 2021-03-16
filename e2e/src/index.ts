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

  mocha.timeout(10000);
  mocha.slow(8000);

  await import('./specs/authentication.e2e-spec');
  await import('./specs/comments-area.e2e-spec');
  await import('./specs/comment');

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
