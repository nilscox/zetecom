/* eslint-disable max-lines, react/no-unescaped-entities */

import React, { ReactNode } from 'react';

import Title from 'src/components/Title';

import './Rules.scss';
import Link from 'src/components/Link';

const Rule: React.FC<{ rule: ReactNode }> = ({ rule, children }) => (
  <div className="rule">
    <h4 className="rule-title"><em>{ rule }</em></h4>
    <div className="note rule-description">{ children }</div>
  </div>
);

const Example: React.FC<{ example: ReactNode }> = ({ example, children }) => (
  <div className="example">
    <h4 className="example-text note">{ example }</h4>
    <div className="example-description">{ children }</div>
  </div>
);

const Rules: React.FC = () => {
  return (
    <>

      <Title id="Charte">La charte de Zétécom</Title>

      <p>
        Cette présente charte propose un ensemble de règles dans le but d'apporter un cadre sain et propice à des échanges ouverts et respectueux.
        Tous les utilisateurs inscrits sur la plateforme se doivent de l'accepter et de la respecter.
      </p>

      <p style={{ fontSize: 14, lineHeight: '16px', margin: '20px 0' }}>
        L'élaboration la charte est en cours, nous cherchons d'ailleurs des personnes dotées d'un sens critique affûté pour nous épauler dans la conception de ces règles, car c'est un point clé du projet.
        Si cette réflexion vous intéresse, nous sommes ouverts à vos remarques.
      </p>

      <p>
        Sur Zétécom, vous êtes tenus de :
      </p>

      <Rule rule={<>1. Respecter les limites de <Link openInNewTab href="https://eduscol.education.fr/internet-responsable/ressources/legamedia/liberte-d-expression-et-ses-limites.html">la liberté d'expression</Link>.</>}>
        Les commentaires sont publiés publiquement sur internet, et sont soumis à la loi française.
        Les propos diffamatoires, sexistes, racistes, injurieux, l'atteinte à la vie privée ou encore l'appel à la haine sont formellement interdits.
      </Rule>

      <Rule rule="2. Maintenir les échanges courtois, sans attaque personnelle.">
        Lorsque vous répondez à un commentaire, notamment si vous n'êtes pas d'accord avec celui-ci, attaquez-vous aux idées et non aux personnes.
        Dans tous les cas, veillez à garder un ton respectueux, car la colère et l'énervement ne feront qu'entraver votre crédibilité.
      </Rule>

      <Rule rule="3. Nourrir le débat.">
        Chaque commentaire doit avoir un sens au sein de la discussion.
        Cela peut être une source, un argument, un raisonnement logique, une opinion, une question... du moment qu'il apporte une plus-value.
      </Rule>

      <Rule rule="4. Décrire chaque point de vue objectivement.">
        Lorsque vous donnez votre opinion sur un sujet, votre but doit être d'expliquer ce que vous pensez et pourquoi vous pensez cela.
        Le prosélytisme ou toute forme de publicité sont donc proscrits.
        Si vous le souhaitez, indiquez <Link href="/faq.html#utilisation">en exposant</Link> le <Link openInNewTab href="https://twitter.com/HygieneMentale/status/1230849591534407685">degré de croyance</Link> (ou degré de certitude) de ce que vous avancez.
      </Rule>

      <Rule rule="5. Apporter les sources nécessaires à la vérification des faits énoncés.">
        En particulier lorsque vos affirmations sortent de l'ordinaire, il est important d'expliciter leurs sources.
        De même prenez le temps de vérifier le messages sourcés, car une affirmation sans preuve peut être rejetée sans preuve.
      </Rule>

      <Rule rule="6. Rédiger en français correct.">
        Votre message sera toujours mieux reçu s'il est bien écrit et lisible.
        Veillez à éviter le registre familier, les abréviations, le style "texto", et les <Link openInNewTab href="https://languagetool.org/fr">fautes d'orthographe</Link> autant que possible.
      </Rule>

      <Rule rule="7. Faire preuve de bienveillance.">
        Quelle que soit la situation, gardez un état d'esprit coopératif.
        Mettez-vous à la place des personnes qui liront vos commentaires, et montrez-vous capable de <Link openInNewTab href="https://fr.wikipedia.org/wiki/Principe_de_charit%C3%A9">charité interprétative</Link> en lisant ceux des autres utilisateurs.
      </Rule>

      <p style={{ marginTop: 40 }}>
        Ces règles sont la base d'une collaboration intelligente entre tous les utilisateurs.
        Vous êtes toutefois vivement encouragé.e à employer les outils de la pensée critique et de la rhétorique pour mieux comprendre les points de vue et étayer votre discours.
      </p>

      <p>
        Enfin, dans un but d'amélioration en continu, ces règles évoluent. Vous serez tenu.e informé.e par email lorsque des modifications y seront apportées.
      </p>

      <p style={{ marginTop: 40 }}>Quelques exemples de commentaires ne respectant pas la charte :</p>

      <div className="examples">

        <Example example={'"Joré voulu ki la ferme."'}>
          Le message est mal rédigé et le langage est familier. Préférez "J'aurais voulu qu'il ne dise rien."
        </Example>

        <Example example={'"Le journaliste est un imbécile."'}>
          C'est une attaque sur la personne et les propos sont injurieux.
          Préférez "Le journaliste a écrit que [...], il n'a donc pas compris."
        </Example>

      </div>

      <div className="examples">

        <Example example={'"Il ne faut pas avoir peur de l\'énergie nucléaire."'}>
          Le point de vue n'est pas objectif.
          Préférez "Selon cette étude, l'énergie nucléaire n'est pas à craindre."
        </Example>

        <Example example={'"Je trouve que vous avez très bien résumé la situation."'}>
          Le message n'apporte aucune plus-value.
        </Example>

      </div>

      {/*
        <p>
          Pour plus d'exemples s'appliquant aussi à cette charte, faites un tour sur <Link openInNewTab href="https://www.lemonde.fr/actualite-medias/article/2019/05/21/l-espace-des-contributions-du-monde-en-10-questions_5465155_3236.html">la partie 2 de l'espace des contribution du Monde</Link>.
        </p>
      */}

    </>
  );
};

export default Rules;
