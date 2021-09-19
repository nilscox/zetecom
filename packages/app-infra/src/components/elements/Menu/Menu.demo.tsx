import { useState } from 'react';

import { Button } from '~/components/elements/Button/Button';
import { Demo } from '~/demos';

import { Menu, MenuItem } from './Menu';

export const menu: Demo = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Menu menuButton={<Button>Open menu</Button>}>
        <MenuItem selected={selected === 'ri'} onClick={() => setSelected('ri')}>
          Ri rit
        </MenuItem>

        <MenuItem selected={selected === 'fi'} onClick={() => setSelected('fi')}>
          Fi fit
        </MenuItem>

        <MenuItem selected={selected === 'lou'} onClick={() => setSelected('lou')}>
          Lou loue
        </MenuItem>
      </Menu>
    );
  },
};
