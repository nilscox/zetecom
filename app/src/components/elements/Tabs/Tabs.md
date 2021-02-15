```tsx
import Tabs, { Tab, useTabs } from './Tabs';

const [currentTab, tabs] = useTabs(['iti', 'mano', 'raspout']);

const tabPanels = {
  iti: <div role="tabpanel">Iti tab</div>,
  mano: <div role="tabpanel">Mano tab</div>,
  raspout: <div role="tabpanel">Raspout tab</div>,
};

<>
  <Tabs>
    <Tab {...tabs.iti}>Iti</Tab>
    <Tab {...tabs.mano}>Mano</Tab>
    <Tab {...tabs.raspout}>Raspout</Tab>
  </Tabs>

  {tabPanels[currentTab]}
</>;
```
