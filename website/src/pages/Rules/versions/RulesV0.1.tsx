/* eslint-disable max-lines, react/no-unescaped-entities */

import React, { ReactNode } from 'react';

import Link from 'src/components/Link';
import RouterLink from 'src/components/Link/RouterLink';

const Rule: React.FC<{ rule: ReactNode }> = ({ rule, children }) => (
  <div className="rule">
    <h4 className="rule-title">
      <em>{rule}</em>
    </h4>
    <div className="note rule-description">{children}</div>
  </div>
);

const Example: React.FC<{ example: ReactNode }> = ({ example, children }) => (
  <div className="example">
    <div className="example-text note">{example}</div>
    <div className="example-description">{children}</div>
  </div>
);

const Rules: React.FC = () => {
  return (
    <>
      <p>
        Cette présente charte propose un ensemble de règles qui définissent l'état d'esprit à adopter pour favoriser des
        échanges constructifs. Tous les utilisateurs inscrits se doivent de la respecter.
      </p>

      <p>Sur Zétécom, vous êtes tenus de :</p>

      <Rule rule="1. Maintenir les échanges courtois, sans attaque personnelle.">
        Lorsque vous répondez à un commentaire, notamment si vous n'êtes pas d'accord avec celui-ci, attaquez-vous aux
        idées et non aux personnes. Dans tous les cas, veillez à garder un ton respectueux, car la colère et
        l'énervement ne feront qu'entraver votre crédibilité.
      </Rule>

      <Rule rule="2. Nourrir le débat.">
        Chaque commentaire doit avoir un sens au sein de la discussion. Cela peut être une source, un argument, un
        raisonnement logique, une opinion, une question... du moment qu'il apporte une plus-value.
      </Rule>

      <Rule rule="3. Décrire chaque point de vue objectivement.">
        Lorsque vous donnez votre opinion sur un sujet, votre but doit être d'expliquer ce que vous pensez et pourquoi
        vous pensez cela. Le prosélytisme ou toute forme de publicité sont donc proscrits. Si vous le souhaitez,
        indiquez <RouterLink to="/faq.html#plateforme">en exposant</RouterLink> le{' '}
        <Link href="https://twitter.com/HygieneMentale/status/1230849591534407685">degré de croyance</Link> (ou degré de
        certitude) de ce que vous avancez.
      </Rule>

      <Rule rule="4. Apporter les sources nécessaires à la vérification des faits énoncés.">
        En particulier lorsque vos affirmations sortent de l'ordinaire, il est important d'expliciter leurs sources. De
        même prenez le temps de vérifier les messages sourcés, car une affirmation sans preuve peut être rejetée sans
        preuve.
      </Rule>

      <Rule rule="5. Rédiger en français correct.">
        Votre message sera toujours mieux reçu s'il est bien écrit et lisible. Veillez à éviter le registre familier,
        les abréviations, le style "texto", et les fautes d'orthographe autant que possible. Un outil comme l'extension{' '}
        <Link href="https://languagetool.org/fr/#plugins">languagetool</Link> peut s'avérer utile.
      </Rule>

      <Rule rule="6. Faire preuve de bienveillance.">
        Quelle que soit la situation, gardez un état d'esprit coopératif. Mettez-vous à la place des personnes qui
        liront vos commentaires, et montrez-vous capable de{' '}
        <Link href="https://fr.wikipedia.org/wiki/Principe_de_charit%C3%A9">charité interprétative</Link> en lisant ceux
        des autres utilisateurs.
      </Rule>

      <p style={{ marginTop: 40 }}>
        Ces règles sont la base d'une collaboration intelligente entre tous les utilisateurs. Vous êtes toutefois
        vivement encouragé.e à employer les outils de la pensée critique et de la rhétorique pour mieux comprendre les
        points de vue et étayer votre discours.
      </p>

      <p>
        Enfin, dans un but d'amélioration en continu, ces règles évoluent. Vous êtes vous-même invité.e à proposer des
        évolutions si vous le souhaitez, nous en discuterons avec d'autres membres de la communauté.
      </p>

      <p style={{ marginTop: 40 }}>Quelques exemples de commentaires ne respectant pas la charte :</p>

      <div className="examples">
        <Example example={'"En + elle et ariver a la bourre!!!"'}>
          Le message est mal rédigé et le langage est familier. Préférez "En plus, elle est arrivée en retard !"
        </Example>

        <Example example={'"Le journaliste est un imbécile."'}>
          C'est une attaque sur la personne et les propos sont injurieux. Préférez "Le journaliste a écrit que [...], il
          n'a donc pas compris."
        </Example>
      </div>

      <div className="examples">
        <Example example={'"Il ne faut pas avoir peur de l\'énergie nucléaire."'}>
          Le point de vue n'est pas objectif. Préférez "Selon cette source, l'énergie nucléaire n'est pas à craindre."
        </Example>

        <Example example={'"Je trouve que vous avez très bien résumé la situation."'}>
          Le message n'apporte aucune plus-value. Préférez annoter le commentaire d'un "je suis d'accord".
        </Example>
      </div>

      {/*
        <p>
          Pour plus d'exemples s'appliquant aussi à cette charte, faites un tour sur <Link href="https://www.lemonde.fr/actualite-medias/article/2019/05/21/l-espace-des-contributions-du-monde-en-10-questions_5465155_3236.html">la partie 2 de l'espace des contribution du Monde</Link>.
        </p>
      */}
    </>
  );
};

export default Rules;
