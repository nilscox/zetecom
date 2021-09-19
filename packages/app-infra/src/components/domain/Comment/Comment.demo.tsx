/* eslint-disable max-len */

import {
  createAuthenticatedUser,
  createComment,
  createUser,
  ReactionType,
  setAuthenticatedUser,
  setComment,
} from '@zetecom/app-core';

import { Demo } from '~/demos';

import { Comment } from './Comment';

const arthur = createUser({ id: '2', nick: 'Arthur' });
const perceval = createAuthenticatedUser({ id: '3', nick: 'Seigneur Perceval' });
const loth = createUser({ id: '4', nick: 'Le Roi Loth' });
const léodagan = createUser({ id: '5', nick: 'Léodagan' });

const connard = createComment({
  id: '10',
  author: arthur,
  text: 'Mais vous êtes pas mort, espèce de connard ?',
});

const chevres = createComment({
  id: '9',
  author: léodagan,
  text: "Moi une fois, j'étais tellement raide que j'avais l'impression de me faire attaquer de tous côtés, j'me défendais, j'me défendais... En fait, j'étais dans un pâturage, j'ai tué 76 chèvres !",
});

const approche = createComment({
  id: '8',
  author: perceval,
  text: "Une fois, à une exécution, je m'approche d'une fille. Pour rigoler, je lui fais : « Vous êtes de la famille du pendu ? »... C'était sa sœur. Bonjour l'approche !",
});

const faux = createComment({
  id: '7',
  author: perceval,
  text: 'C’est pas faux.',
});

const merdique = createComment({
  id: '6',
  author: loth,
  text: 'Parce que votre existence est merdique, mon pauvre ami... Vous avez l’œil qui brille à chaque fois qu’un oiseau pète ! C’est triste à voir ! Ça fait des années que vous menez un train de vie de noix de St-Jacques, alors évidemment, un message... qui annonce la visite d’un imbécile, porteur de bonnes nouvelles, c’est déjà un p’tit festival pour vous ! J’suis sûr que vous vous êtes peigné pour l’occasion !',
});

const crame = createComment({
  id: '5',
  author: arthur,
  text: 'Ah, le printemps ! La nature se réveille, les oiseaux reviennent, on crame des mecs.',
  replies: [approche],
});

const lire = createComment({
  id: '4',
  author: léodagan,
  text: 'Moi j’ai appris à lire, ben je souhaite ça à personne.',
});

const vieilleBranch = createComment({
  id: '3',
  author: loth,
  text: 'Ah ! À ce propos, je dois vous avouer que j\'ai longtemps réfléchi à savoir comment vous deviez m\'appeler. [...] Éh oui ! Parce que vous êtes pas, à proprement parler, un de mes sujets. Vous êtes pas sous mes ordres non plus. "Sire" c\'est quand même un peu ampoulé. Alors j\'ai pensé à beaucoup de choses. "Loth", "Seigneur", "Monsieur"... Je me suis même demandé si vous deviez pas m\'appeler "vieille branche", "mon p\'tit pote" ou "canaillou".',
  replies: [chevres, faux],
});

const tourne = createComment({
  id: '2',
  author: perceval,
  text: 'Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !',
  subscribed: true,
  replies: [connard, crame, merdique],
});

const druide = createComment({
  id: '1',
  author: arthur,
  text: "Au bout d'un moment, il est vraiment druide, c'mec-là, ou ça fait quinze ans qu'il me prend pour un con ?",
  reactionsCount: {
    like: 6,
    approve: 10,
    think: 3,
    disagree: 0,
    dontUnderstand: 1,
  },
  userReaction: ReactionType.approve,
  replies: [tourne, vieilleBranch],
});

const comments = [druide, tourne, vieilleBranch, lire, crame, merdique, faux, approche, chevres, connard];
const rootComment = comments[0];

export const asRandomUser: Demo = {
  description: 'Seen as an unauthenticated user',
  prepare: ({ store, containers }) => {
    store.dispatch(setComment({ ...rootComment, replies: [] }));
    containers.comments.addItems(comments);
  },
  render: () => <Comment commentId={rootComment.id} />,
};

export const asLoggedInUser: Demo = {
  description: `Seen as a logged in user (${perceval.nick})`,
  prepare: ({ store, containers }) => {
    store.dispatch(setComment({ ...rootComment, replies: [] }));
    store.dispatch(setAuthenticatedUser(perceval));
    containers.comments.addItems(comments);
  },
  render: () => <Comment commentId={rootComment.id} />,
};
