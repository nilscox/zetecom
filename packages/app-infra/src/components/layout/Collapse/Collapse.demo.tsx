import React, { useState } from 'react';

import { Demo } from '~/demos';

import { Collapse } from './Collapse';

export const short: Demo = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(!open)}>{open ? 'close' : 'open'}</button>

        <Collapse open={open}>
          <p>content</p>
          <p>
            content
            <br />
            content
          </p>
        </Collapse>
      </>
    );
  },
};

export const long: Demo = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [lines, setLines] = useState(10);

    return (
      <>
        <button onClick={() => setOpen(!open)}>{open ? 'close' : 'open'}</button>
        <button onClick={() => setLines((lines + 5) % 25)}>add lines</button>

        <Collapse open={open}>
          {Array(lines)
            .fill(0)
            .map((_, i) => (
              <p key={i}>content</p>
            ))}
        </Collapse>
      </>
    );
  },
};
