import { Icon } from '~/components/elements/Icon/Icon';

import { Demo } from '../../demos';

import * as icons from './index';

export const iconsDemo: Demo = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(icons).map((name) => (
        <div key={name} style={{ width: 120, margin: 10, textAlign: 'center' }}>
          <Icon as={icons[name as keyof typeof icons]} color="secondary" size={6} />
          <div>{name}</div>
        </div>
      ))}
    </div>
  ),
};
