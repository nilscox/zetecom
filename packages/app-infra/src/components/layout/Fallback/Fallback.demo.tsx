import { Demo } from '~/demos';

import { Fallback } from './Fallback';

export const fallback: Demo = {
  render: () => <Fallback>Aucun résultat trouvé pour cette recherche.</Fallback>,
};
