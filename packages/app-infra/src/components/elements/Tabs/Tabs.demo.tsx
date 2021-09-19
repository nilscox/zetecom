import React, { useState } from 'react';

import { Demo } from '~/demos';

import { Tab, TabPanel, Tabs } from './Tabs';

export const tabs: Demo = {
  render: () => {
    const [currentTab, setCurrentTab] = useState('london');

    return (
      <>
        <Tabs>
          <Tab active={currentTab === 'london'} onClick={() => setCurrentTab('london')}>
            London
          </Tab>

          <Tab active={currentTab === 'paris'} onClick={() => setCurrentTab('paris')}>
            Paris
          </Tab>

          <Tab active={currentTab === 'tokyo'} onClick={() => setCurrentTab('tokyo')}>
            Tokyo
          </Tab>
        </Tabs>

        {currentTab === 'london' && <TabPanel paddingY={4}>London is the capital city of England.</TabPanel>}

        {currentTab === 'paris' && <TabPanel paddingY={4}>Paris is the capital of France.</TabPanel>}

        {currentTab === 'tokyo' && <TabPanel paddingY={4}>Tokyo is the capital of Japan.</TabPanel>}
      </>
    );
  },
};
