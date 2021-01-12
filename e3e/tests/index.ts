import 'mocha';
import 'mocha/mocha.css';

import chai from 'chai';
import chaiDom from 'chai-dom';

import { registerMochaLifecycles, IFrame } from 'test-runner';

mocha.setup('bdd');
chai.use(chaiDom);

const main = async () => {
  before(function () {
    this.iframe = new IFrame(document.querySelector('iframe')!);
  });

  await import('./test');
  await import('./comment');
  await import('./comments-area');

  registerMochaLifecycles(mocha.run());
};

main().catch(console.error);
