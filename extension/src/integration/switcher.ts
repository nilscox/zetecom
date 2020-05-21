const createTabs = (leftText: string, rightText: string) => {
  const left = document.createElement('button');
  const right = document.createElement('button');

  const setStyles = (element: HTMLButtonElement) => {
    element.style.width = '330px';
    element.style.padding = '10px 25px';
    element.style.margin = '0';

    element.style.outline = 'none';
    element.style.fontSize = '16px';
    element.style.fontWeight = '600';
    element.style.background = 'transparent'

    element.style.border = '0px';
    element.style.borderBottomStyle = 'solid';
    element.style.borderBottomWidth = '2px';

    element.style.transitionProperty = 'border-color, color';
    element.style.transitionDuration = '200ms';
    element.style.transitionTimingFunction = 'ease-in-out';
  };

  setStyles(left);
  setStyles(right);

  left.innerText = leftText;
  right.innerText = rightText;

  const container = document.createElement('div');

  container.id = 'ri-switcher';

  container.style.minWidth= '660px';
  container.style.margin = '20px 0';
  container.style.textAlign = 'center';
  container.style.fontFamily= '"Nunito Sans", Roboto, "Sans Serif"';

  container.appendChild(left);
  container.appendChild(right);

  return [container, [left, right]] as const;
};

const setSelectedStyles = (
  darkMode: boolean,
  selectedTab: HTMLElement,
  selectedElement: HTMLElement,
  unselectedTab: HTMLElement,
  unselectedElement: HTMLElement,
) => {
  selectedTab.style.color = darkMode ? '#CCD' : '#334';
  selectedTab.style.borderBottomColor = '#CCC';
  selectedTab.style.cursor = 'initial';
  selectedElement.style.display = 'block';

  unselectedTab.style.color = darkMode ? '#99A' : '#667';
  unselectedTab.style.borderBottomColor = 'transparent';
  unselectedTab.style.cursor = 'pointer';
  unselectedElement.style.display = 'none';
};

type Tab = {
  text: string;
  element: HTMLElement;
}

const createSwitcher = (darkMode: boolean, left: Tab, right: Tab) => {
  const container = document.createElement('div');

  container.id = 'ri-container';

  const [tabs, [leftTab, rightTab]] = createTabs(left.text, right.text);

  const setTabSelected = (selected: 'left' | 'right') => {
    const [selectedTab, selectedElement] = selected === 'left' ? [leftTab, left.element] : [rightTab, right.element];
    const [unselectedTab, unselectedElement] = selected === 'left' ? [rightTab, right.element] : [leftTab, left.element];

    setSelectedStyles(darkMode, selectedTab, selectedElement, unselectedTab, unselectedElement);
  };

  leftTab.addEventListener('click', () => setTabSelected('left'));
  rightTab.addEventListener('click', () => setTabSelected('right'));

  setTabSelected('right');

  // the original element must be replaced with the container first
  setTimeout(() => {
    container.appendChild(tabs);
    container.appendChild(left.element);
    container.appendChild(right.element);
  }, 0);

  return container;
};

export default createSwitcher;
