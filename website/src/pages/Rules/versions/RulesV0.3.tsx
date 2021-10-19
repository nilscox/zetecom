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

export const Changes: React.FC = () => {
  return (
    <ul>
      <li>Correction orthographique de la règle 1</li>
      <li>Reformulation de la description de la règle 1</li>
      <li>Reformulation de la règle 3 et de sa description</li>
      <li>Reformulation de la règle 4</li>
    </ul>
  );
};

const Rules: React.FC = () => {
  return (
    <>
      <Rule rule="1. Lire les messages en laissant de côté ses a priori.">
        Les zones de commentaires permettent à chacun d'exprimer publiquement ses opinions, certaines ne s'accorderont
        donc naturellement pas avec les vôtres. Cherchez à comprendre le chemin de pensée de l'auteur, en faisant preuve
        de <Link href="https://fr.wikipedia.org/wiki/Principe_de_charit%C3%A9">charité interprétative</Link>. Le temps
        de la lecture, essayez de vous abstraire de vos propres opinions, de suspendre votre jugement.
      </Rule>

      <Rule rule="2. Maintenir les échanges courtois, sans attaque personnelle.">
        Attaquez-vous aux idées et non aux personnes lorsque vous participez aux échanges, tout en gardant un ton
        respectueux. Cherchez les formulations qui donneront envie à vos interlocuteurs de vous répondre, surtout s'ils
        sont susceptibles d'avoir un avis différent.
      </Rule>

      <Rule rule="3. Expliquer les raisons qui justifient son point de vue.">
        Lorsque vous donnez votre avis, mettez en évidence les faits et les liens qui vous ont fait aboutir à ces
        conclusions, ainsi que votre manière de réfléchir, votre méthode. On aimerait savoir pourquoi vous pensez ce que
        vous pensez.
      </Rule>

      <Rule rule="4. Préciser un degré de certitude des affirmations énoncées.">
        Pour vous assurer d'être bien compris, il peut vous être utile d'exprimer à quel point vous êtes sûr.e des
        affirmations clés que vous avancez. Zétécom{' '}
        <RouterLink to="/faq.html#plateforme">permet d'annoter une phrase</RouterLink> avec un degré de croyance, via{' '}
        <Link href="https://twitter.com/HygieneMentale/status/1230849591534407685">une notation en exposant</Link>,
        comme ceci<sup>80</sup>.
      </Rule>

      <Rule rule="5. Apporter les sources nécessaires à la vérification des faits avancés.">
        En particulier lorsque vos affirmations sortent de l'ordinaire, il est important d'expliciter leurs sources. De
        même prenez le temps de vérifier les messages sourcés, et de les remettre en question si nécessaire.
      </Rule>

      <Rule rule="6. Rédiger en français correct.">
        Votre message sera toujours mieux perçu s'il est bien écrit et lisible. Évitez le registre familier, les
        abréviations et le style "texto". Une extension comme{' '}
        <Link href="https://languagetool.org/fr/#plugins">languagetool</Link> vous permettra même de corriger les fautes
        d'orthographe directement pendant la rédaction d'un message.
      </Rule>

      <Rule rule="7. Faire preuve de bienveillance.">
        Lorsque vous répondez à un commentaire, mettez-vous à la place des personnes qui liront le vôtre, et gardez un
        état d'esprit coopératif. N'hésitez pas à reformuler les propos des autres intervenants pour vous assurer d'en
        avoir compris le fond.
      </Rule>

      <p style={{ marginTop: 40 }}>
        Ces règles peuvent être applicables ou non et de manière différentes selon les situations. Elles ne sont pas
        absolues, mais définissent plutôt un état d'esprit général à adopter dans le but de favoriser des échanges
        constructifs. Vous êtes toutefois vivement encouragé.e à employer les outils de la pensée critique et de la
        rhétorique pour mieux comprendre chaque point de vue et étayer votre discours.
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
    </>
  );
};

export default Rules;
