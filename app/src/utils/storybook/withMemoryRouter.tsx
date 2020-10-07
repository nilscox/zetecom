import React from 'react';

import { MemoryRouter } from 'react-router-dom';

const withMemoryRouter = (Story: React.FC) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

export default withMemoryRouter;
