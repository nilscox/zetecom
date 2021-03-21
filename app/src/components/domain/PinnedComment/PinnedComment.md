```tsx
import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';

import { StyleguidistCommentContainer } from '../Comment/Comment.styleguidist';

const parents = [
  makeComment({
    id: 1,
    author: makeUser({ nick: 'Martin' }),
    text:
      "Je sais pas vous, mais moi cette histoire ne m'inspire pas confiance. A mon avis, il doit se passer quelque chose de louche, quelque chose qu'on ne comprend pas.",
  }),
  makeComment({
    id: 2,
    author: makeUser({ nick: 'archibald' }),
    text: "Je suis d'accord, mais à une nuance près :",
  }),
  makeComment({
    id: 3,
    author: makeUser({ nick: 'Jérôme Dumouchel' }),
    text: 'Ce que tu dis est vrai, mais dépend beaucoup trop du contexte pour en tirer une telle conclusion.',
  }),
];

const comment = makeComment({
  text: 'Commentaire très intéressant.',
  author: makeUser({ nick: 'Tonny', id: 2 }),
});

<PinnedComment CommentContainer={StyleguidistCommentContainer} parents={parents} comment={comment} />;
```
