import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Reaction/Reaction.stories.js');
  require('../src/components/ReactionForm/ReactionForm.stories.js');
}

configure(loadStories, module);
