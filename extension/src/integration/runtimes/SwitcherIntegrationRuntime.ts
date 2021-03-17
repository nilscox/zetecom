import { BaseIntegrationRuntime } from './BaseIntegrationRuntime';
import IFrame from '../IFrame';
import log from '../../utils/log';

// TODO: merge theses classes
export default class Switcher {
  private leftTab: HTMLButtonElement;
  private rightTab: HTMLButtonElement;
  private tabs: HTMLDivElement;

  private leftElement?: HTMLElement;
  private rightElement?: HTMLElement;

  constructor(leftText: string, rightText: string, darkMode: boolean, private resize: () => void) {
    this.leftTab = this.createTab('left', leftText);
    this.rightTab = this.createTab('right', rightText);
    this.tabs = this.createTabsContainer(this.leftTab, this.rightTab, darkMode);
  }

  set left(element: HTMLElement) {
    this.leftElement = element;
    element.style.display = 'none';
  }

  set right(element: HTMLElement) {
    this.rightElement = element;
    element.style.display = 'none';
  }

  get tabsElement() {
    return this.tabs;
  }

  unmount() {
    this.leftTab.remove();
    this.rightTab.remove();
    this.tabs.remove();
  }

  focus(tab: 'left' | 'right') {
    log('focus tab ' + tab);

    const [oldTab, oldElement] = this.getElements(tab === 'left' ? 'right' : 'left');
    const [newTab, newElement] = this.getElements(tab);

    if (!oldElement || !newElement) {
      throw new Error('left or right element is not set');
    }

    oldTab.classList.remove('active');
    oldElement.style.display = 'none';

    newTab.classList.add('active');
    newElement.style.display = 'block';

    this.resize();
  }

  private getElements(tab: 'left' | 'right') {
    const left = [this.leftTab, this.leftElement] as const;
    const right = [this.rightTab, this.rightElement] as const;

    return tab === 'left' ? left : right;
  }

  private createTabsContainer(left: HTMLButtonElement, right: HTMLButtonElement, darkMode: boolean) {
    const tabs = document.createElement('div');

    tabs.id = 'zetecom';
    tabs.classList.add('zc-tabs');

    if (darkMode) {
      tabs.classList.add('dark');
    }

    tabs.appendChild(left);
    tabs.appendChild(right);

    return tabs;
  }

  private createTab(which: 'left' | 'right', text: string) {
    const tab = document.createElement('button');

    tab.classList.add('zc-tab');
    tab.classList.add('tab-' + which);
    tab.textContent = text;

    tab.addEventListener('click', () => this.focus(which));

    return tab;
  }
}

export class SwitcherIntegrationRuntime extends BaseIntegrationRuntime {
  private switcher?: Switcher;

  mount() {
    const { integration, identifier, element } = this;

    if (!identifier) {
      throw new Error('cannot get identifier');
    }

    if (!element) {
      throw new Error('cannot get element');
    }

    if (document.querySelector('iframe#zc-iframe')) {
      throw new Error('zc-iframe already exists in the document');
    }

    log('creating iframe');
    const iframe = (this.iframe = new IFrame(this.integration.name, identifier));

    log('creating switcher');
    const switcher = (this.switcher = new Switcher(
      integration.externalElementTabText!,
      'Commentaires Zétécom',
      !!integration.darkMode,
      () => this.iframe?.resize(),
    ));

    element.insertAdjacentElement('beforebegin', switcher.tabsElement);
    element.insertAdjacentElement('afterend', iframe.element);

    switcher.left = element;
    switcher.right = iframe.element;

    this.switcher.focus('left');

    log('loading iframe resizer');
    iframe.loadIframeResizer();
  }

  unmount() {
    log('unmounting switcher');
    this.switcher?.unmount();

    log('unmounting iframe');
    this.iframe?.unmount();
  }

  show() {
    if (this.switcher) {
      this.switcher.focus('right');
      this.scrollIntoViewOffset(this.switcher.tabsElement);
    }
  }
}
