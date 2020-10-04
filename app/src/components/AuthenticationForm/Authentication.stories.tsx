import React, { useState } from 'react';

import AcceptRulesCheckbox from './fields/AcceptRulesCheckbox';

export default {
  title: 'Authentication',
};

export const AcceptRules: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ width: 300 }}>
      <AcceptRulesCheckbox form="signup" checked={checked} onChange={(_, checked) => setChecked(checked)} />
    </div>
  );
};
