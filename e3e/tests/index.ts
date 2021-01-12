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

  await import('./test.spec');
  await import('./comment.spec');
  await import('./comments-area.spec');

  registerMochaLifecycles(mocha.run());
};

main().catch(console.error);
