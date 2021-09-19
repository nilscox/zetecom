import { useState } from 'react';

import { Demo } from '~/demos';

import { Async } from './Async';

export const async: Demo = {
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <>
        <button onClick={() => setLoading(!loading)}>Loading: {String(loading)}</button>
        <Async loading={loading} render={() => <div>Async content</div>} />
      </>
    );
  },
};
