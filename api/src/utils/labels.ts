const LABELS = {
  1: 'SOURCE',
  2: 'METHOD',
  3: 'QUESTION',
  4: 'OPINION',
  5: 'FUN',
};

const keys = Object.keys(LABELS);
const values = keys.map(k => LABELS[k]);

export default values;

export const labelId = (key: string): number => {
  return parseInt(keys[values.indexOf(key)], 10);
};

export const labelName = (id: number): string => {
  return LABELS[id];
};
