import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/App.css';

addDecorator(storyFn => <div id="app">{storyFn()}</div>);
