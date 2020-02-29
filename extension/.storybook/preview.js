import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => <div id="app">{storyFn()}</div>);
