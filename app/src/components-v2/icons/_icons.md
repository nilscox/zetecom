```tsx
import Icon from '../elements/Icon/Icon';

import icons from './index';

<div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {Object.keys(icons).map(name => (
    <div key={name} style={{ width: 120, margin: 10, textAlign: 'center' }}>
      <Icon as={icons[name]} />
      <div>{name}</div>
    </div>
  ))}
</div>;
```
