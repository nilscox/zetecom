/* eslint-disable max-len */

import { Demo } from '~/demos';

import { Diff } from './Diff';

const before = `I'd call you a genius, expect I'm in the room. There are worlds out there where the sky is burning, and the sea's asleep, and the rivers dream; people made of smoke and cities made of song.
Somewhere there's injustice, and somewhere else the tea's getting cold. Come on, Ace. We've got work to do.
Your species has the most amazing capacity for self-deception?
Matched only by its ingenuity when trying to destroy itself. I'm sorry. Goodbye...my Sarah Jane! I'm so sorry.
The original you might say! I've reversed the polarity of the Neutron flow, so the TARDIS should be free from the force field.
This stuff, or whoever sent it, is cleverer than we are. Unfortunate. Your hips are fine, you're built like a man!`;

const after = `# This is exciting!!!
I'd *call* you a genius, except I'm in the room. There are worlds out there where the sky is burning, and the sea's asleep; people made of smoke and cities made of song.
Somewhere there's injustice, and somewhere else the tea's getting cold. Come on, Ace. We've got work to do.
The original you might say! I've reversed the entropy of the Neutron flow, so the TARDIS should be free from the force field.
This stuff, or whoever sent it, is cleverer than we are. Unfortunate, isn't it?
Your hips are fine, you're built like a man!`;

export const diff: Demo = {
  render: () => <Diff before={before} after={after} />,
};
