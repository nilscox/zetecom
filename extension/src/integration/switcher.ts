import { sendMessageToContentScript } from "./messages";

const createTabs = (darkMode: boolean, leftText: string, rightText: string) => {
  const left = document.createElement('button');
  const right = document.createElement('button');

  left.classList.add('button');
  left.innerText = leftText;

  right.classList.add('button');
  right.innerText = rightText;

  const container = document.createElement('div');

  container.id = 'ri-switcher';

  if (darkMode)
    container.classList.add('dark');

  container.appendChild(left);
  container.appendChild(right);

  return [container, [left, right]] as const;
};

const setSelectedStyles = (
  selectedTab: HTMLElement,
  selectedElement: HTMLElement,
  unselectedTab: HTMLElement,
  unselectedElement: HTMLElement,
) => {
  selectedTab.classList.add('selected');
  selectedElement.style.display = 'block';

  unselectedTab.classList.remove('selected');
  unselectedElement.style.display = 'none';
};

type Tab = {
  text: string;
  element: HTMLElement;
}

const createSwitcher = (darkMode: boolean, left: Tab, right: Tab) => {
  const [tabs, [leftTab, rightTab]] = createTabs(darkMode, left.text, right.text);

  const setTabSelected = (selected: 'left' | 'right') => {
    const [selectedTab, selectedElement] = selected === 'left' ? [leftTab, left.element] : [rightTab, right.element];
    const [unselectedTab, unselectedElement] = selected === 'left' ? [rightTab, right.element] : [leftTab, left.element];

    setSelectedStyles(selectedTab, selectedElement, unselectedTab, unselectedElement);
    sendMessageToContentScript({ type: 'TAB_CHANGED', tab: selected });
  };

  leftTab.addEventListener('click', () => setTabSelected('left'));
  rightTab.addEventListener('click', () => setTabSelected('right'));

  return [tabs, setTabSelected] as const;
};

export default createSwitcher;
