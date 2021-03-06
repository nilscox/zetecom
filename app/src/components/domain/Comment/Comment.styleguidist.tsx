/* eslint-disable max-len */
/* eslint-disable no-console */

import React from 'react';

import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';
import { Comment as CommentType } from 'src/types/Comment';

import Comment from './Comment';

const user = makeUser({ id: 1, nick: 'Myself' });
const arthur = makeUser({ id: 2, nick: 'Arthur' });
const perceval = makeUser({ id: 3, nick: 'Seigneur Perçeval' });
const loth = makeUser({ id: 4, nick: 'Loth' });
const leodagan = makeUser({ id: 5, nick: 'Leodagan' });

const druide = makeComment({
  id: 1,
  author: arthur,
  text: "Au bout d'un moment, il est vraiment druide, c'mec-là, ou ça fait quinze ans qu'il me prend pour un con ?",
  repliesCount: 2,
  reactionsCount: {
    like: 5,
    approve: 4,
    think: 3,
    disagree: 2,
    dontUnderstand: 1,
  },
});

const tourne = makeComment({
  id: 2,
  author: perceval,
  repliesCount: 3,
  text:
    'Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !',
});

const vieilleBranch = makeComment({
  id: 3,
  author: loth,
  repliesCount: 1,
  text:
    'Ah ! À ce propos, je dois vous avouer que j\'ai longtemps réflechi à savoir comment vous deviez m\'appeler. [...] Éh oui ! Parce que vous êtes pas, à proprement parler, un de mes sujets. Vous êtes pas sous mes ordres non plus. "Sire" c\'est quand même un peu ampoulé. Alors j\'ai pensé à beaucoup de choses. "Loth", "Seigneur", "Monsieur"... Je me suis même demandé si vous deviez pas m\'appeler "vieille branche", "mon p\'tit pote" ou "canaillou".',
});

const lire = makeComment({
  id: 4,
  author: leodagan,
  repliesCount: 4,
  text: 'Moi j’ai appris à lire, ben je souhaite ça à personne.',
});

const crame = makeComment({
  id: 5,
  author: arthur,
  repliesCount: 1,
  text: 'Ah, le printemps ! La nature se réveille, les oiseaux reviennent, on crame des mecs.',
});

const merdique = makeComment({
  id: 6,
  author: loth,
  text:
    'Parce que votre existence est merdique, mon pauvre ami... Vous avez l’œil qui brille à chaque fois qu’un oiseau pète ! C’est triste à voir ! Ça fait des années que vous menez un train de vie de noix de St-Jacques, alors évidemment, un message... qui annonce la visite d’un imbécile, porteur de bonnes nouvelles, c’est déjà un p’tit festival pour vous ! J’suis sûr que vous vous êtes peigné pour l’occasion !',
});

const faux = makeComment({
  id: 7,
  author: perceval,
  text: 'C’est pas faux.',
});

const approche = makeComment({
  id: 8,
  author: perceval,
  text:
    "Une fois, à une exécution, je m'approche d'une fille. Pour rigoler, je lui fais : « Vous êtes de la famille du pendu ? »... C'était sa sœur. Bonjour l'approche !",
});

const chevres = makeComment({
  id: 9,
  author: leodagan,
  repliesCount: 2,
  text:
    "Moi une fois, j'étais tellement raide que j'avais l'impression de me faire attaquer de tous côtés, j'me défendais, j'me défendais... En fait, j'étais dans un pâturage, j'ai tué 76 chèvres !",
});

const connard = makeComment({
  id: 10,
  author: arthur,
  text: 'Mais vous êtes pas mort, espèce de connard ?',
});

const replies = {
  [druide.id]: [tourne, vieilleBranch],
  [tourne.id]: [connard, crame, merdique],
  [lire.id]: [approche, chevres, faux, connard],
  [crame.id]: [faux],
  [chevres.id]: [lire, druide],
  [vieilleBranch.id]: [lire],
};

const getReplies = (comment: CommentType) => {
  if (!(comment.id in replies)) {
    throw new Error('no replies for comment ' + comment.id);
  }

  return replies[comment.id as keyof typeof replies];
};

const CommentContainer: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const [replies, setReplies] = React.useState<CommentType[]>();
  const [repliesLoading, setRepliesLoading] = React.useState(false);

  React.useEffect(() => {
    if (repliesLoading) {
      const timeout = setTimeout(() => {
        setRepliesLoading(false);
        setReplies(getReplies(comment));
        console.log(getReplies(comment));
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [repliesLoading, comment]);

  const fetchReplies = () => {
    if (replies === undefined) {
      setRepliesLoading(true);
    }
  };

  return (
    <Comment
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={repliesLoading}
      submittingEdition={false}
      submittingReply={false}
      onEdit={text => console.log(`edit comment: "${text}"`)}
      onReport={() => console.log('report comment')}
      onSetReaction={type => console.log(`set reaction: ${String(type)}`)}
      onSetSubscription={subscribed => console.log(`set subscrption: ${String(subscribed)}`)}
      onReply={text => console.log(`reply to comment: "${text}"`)}
      onViewHistory={() => console.log('view history')}
      fetchReplies={fetchReplies}
    />
  );
};

const StyleguidistComment: React.FC = () => <CommentContainer comment={druide} />;

export default StyleguidistComment;
