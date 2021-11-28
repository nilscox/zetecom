const path = require('path');
const moduleAlias = require('module-alias');

require('./src/zetecom-global');

/* eslint-disable no-undef */
window.requestAnimationFrame = () => 0;
window.cancelAnimationFrame = () => {};

const noop = () => 1;

require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;

moduleAlias.addAlias('@zetecom/app-core', path.resolve(__dirname, '..', 'app-core', 'src'));
moduleAlias.addAlias('~', path.resolve(__dirname, 'src'));

const registerMock = (mockPath) => {
  moduleAlias.addAlias(mockPath, path.resolve(__dirname, mockPath.replace(/^~/, 'src') + '.mock'));
};

registerMock('~/components/layout/Collapse/Collapse');
