import 'mocha';
import 'mocha/mocha.css';

import chai from 'chai';
import chaiDom from 'chai-dom';
import { configure } from '@testing-library/dom';

import { registerMochaLifecycles, IFrame } from 'test-runner';

declare global {
  interface Window {
    iframe: HTMLIFrameElement;
  }
}

const main = async () => {
  mocha.setup('bdd');
  chai.use(chaiDom);

  await import('./authentication');
  await import('./comment');
  await import('./comments-area');

  configure({
    // throwSuggestions: true,
    asyncUtilTimeout: 2000,
  });

  before(function () {
    this.iframe = new IFrame(document.querySelector('iframe')!);
    window.iframe = this.iframe;
  });

  beforeEach(async function () {
    await this.iframe.clearCookies();
  });

  registerMochaLifecycles(mocha.run());
};

main().catch(console.error);
