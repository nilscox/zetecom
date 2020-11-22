import log from './log';

export default class Switcher {
  private leftTab: HTMLButtonElement;
  private rightTab: HTMLButtonElement;
  private tabs: HTMLDivElement;

  private leftElement?: HTMLElement;
  private rightElement?: HTMLElement;

  constructor(leftText: string, rightText: string, darkMode: boolean) {
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
  }

  private getElements(tab: 'left' | 'right') {
    const left = [this.leftTab, this.leftElement] as const;
    const right = [this.rightTab, this.rightElement] as const;

    return tab === 'left' ? left : right;
  }

  private createTabsContainer(left: HTMLButtonElement, right: HTMLButtonElement, darkMode: boolean) {
    const tabs = document.createElement('div');

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
