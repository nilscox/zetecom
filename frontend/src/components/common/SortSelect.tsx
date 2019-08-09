import React from 'react';

import { SortType } from 'src/types/SortType';
import { useTheme } from 'src/utils/Theme';

type SortSelectProps = {
  disabled?: boolean;
  onChange: (value: SortType) => void;
};

const SortSelect: React.FC<SortSelectProps> = ({ disabled, onChange }) => {
  const { sizes: { small, medium }, colors: { border }, borderRadiusInput: borderRadius } = useTheme();

  return (
    <select
      style={{
        padding: `${small}px ${medium}px`,
        background: 'transparent',
        outline: 'none',
        border: `1px solid ${border}`,
        borderRadius,
      }}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as SortType)}
    >
      <option value="date-asc">Les plus anciens en premier</option>
      <option value="date-desc">Les plus récent en premier</option>
      <option value="relevance">Les plus pertinents en premier</option>
    </select>
  );
};

export default SortSelect;
