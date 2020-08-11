/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from 'src/components/Title';
import SubTitle from 'src/components/SubTitle';
import Link from 'src/components/Link';
import { useEnvironment } from 'src/index';

import { trackOpenRepositoryLink } from '../../utils/track';
import './FAQ.scss';

type QuestionProps = {
  question: React.ReactNode;
};

const Question: React.FC<QuestionProps> = ({ question, children }) => (
  <div className="question">
    <strong>{ question }</strong>
    <p>{ children }</p>
  </div>
);

const FAQ: React.FC = () => {
  return (
    <>

      <Title id="faq">Questions posées fréquemment</Title>

      <SubTitle id="compte">Compte utilisateur</SubTitle>

      <Question question="Est-il possible d'utiliser l'extension sans créer de compte ?">
        Oui, pour lire les commentaires. La création d'un compte n'est nécessaire que si vous souhaitez interagir avec les autres membres de la plateforme.
      </Question>

      <Question question="Comment créer un compte ?">
        Les inscriptions ne sont pas encore ouvertes publiquement pour l'instant. Si vous souhaitez rejoindre les béta-testeurs, toutes les informations sont disponibles sur <Link href="/beta.html">la page bêta</Link>.
      </Question>

      {/*
      <Question question="Comment supprimer un compte de la plateforme ?">
        Il est possible de supprimer un compte en <Link href="#contact">contactant</Link> l'équipe qui développe le projet par e-mail, depuis l'adresse associée au compte à supprimer.
      </Question>
      */}

      <Question question="Comment modifier le mot de passe d'un compte ?">
        Vous pouvez mettre à jour le mot de passe de votre compte, en passant par la popup de l'extension lorsque vous êtes connecté.e.
      </Question>

      <SubTitle id="utilisation">Utilisation de l'extension</SubTitle>

      <Question question="Comment ouvrir une nouvelle zone de commentaire sur un article ou une vidéo ?">
        Pour le moment, c'est une action manuelle réservée aux administrateurs.
      </Question>

      <Question question="Comment mettre en page un commentaire ?">
        Les messages peuvent être rédigés en <Link openInNewTab href="https://fr.wikipedia.org/wiki/Markdown">markdown</Link>, une syntaxe de balisage permettant une mise en forme simple.
      </Question>

      <Question question="Comment indiquer son degré de croyance en exposant ?">
        La charte vous encourage à expliciter votre degré de croyance dans ce que vous affirmez. Pour se faire, utilisez le symbole <code>^</code> :<br />
        "<code>J'apprécie les fruits au sirop^42</code>" deviendra "J'apprécie les fruits au sirop<sup>42</sup>".
      </Question>

      <Question question="Comment signaler un bug ou proposer de nouvelles fonctionnalités ?">
        <Link href="#contact">Contactez</Link> directement l'équipe qui développe le projet, nous sommes ouverts à vos remarques.
      </Question>

      <SubTitle id="compte">La modération</SubTitle>

      <Question question="Comment est assurée la modération ?">
        Les messages signalés sont traités par des membres volontaires de la communauté.
      </Question>

      <Question question="Qui peut devenir modérateur ?">
        Tous les membres de Zétécom peuvent demander de devenir modérateur, chaque demande sera traitée au cas par cas.
      </Question>

      <SubTitle id="le-projet">Le projet</SubTitle>

      <Question question="Est-ce légal de modifier les sites pour y ajouter des zones de commentaires ?">
        Oui. Lorsque vous installez l'extension sur votre navigateur, la permission de modifier certains sites web vous est demandée.
        Avec votre accord, l'extension sera en mesure de modifier les sites sur lequelles il existe des zones de commentaires (sur votre navigateur, et celui de chaque utilisateur disposant de l'extension).
        C'est le même principe qu'un bloqueur de publicité, ou qu'une extension ajoutant un "mode sombre".
      </Question>

      <Question question="Comment le projet est-il financé ?">
        Le but du projet n'est pas de faire du profit, et aucun financement n'est en jeu.
      </Question>

      <Question question="Qui développe Zétécom ?">
        Le projet est développé par une <Link openInNewTab href="https://nils.cx">petite</Link> <Link openInNewTab href="https://bopzor.me">équipe</Link> de développeurs passionnés par l'esprit critique et la <Link openInNewTab href="https://fr.wikipedia.org/wiki/Zététique">zététique</Link>.
      </Question>

      <Question question="Peut-on participer au projet ?">
        Que ce soit pour donner vos impressions, proposer des axes d'amélioration, ou même plus généralement réfléchir au concept de Zétécom et imaginer ce que l'on peut construire ensemble, vous êtes chaleureusement invité.e à <Link href="#contact">nous envoyer un petit message</Link>.
        Et si vous êtes développeu.r.se et que le projet vous intéresse techniquement, les source sont disponibles sur <Link openInNewTab href={useEnvironment('REPOSITORY_URL')} onClick={() => trackOpenRepositoryLink('faq')}>GitHub</Link>.
      </Question>

      <Question question="Votre question ne figure pas dans cette liste... ?">
        <Link href="#contact">Posez-la nous directement</Link>, nous l'y ajouterons sans tarder :)
      </Question>

      <Title id="donnees-personnelles">Utilisation des données personnelles</Title>

      <p>
        L'installation de l'extension et son utilisation sans créer de compte vous permet d'intégrer les zones de commentaires sur les sites d'information, mais ne vous permet pas de répondre à ces commentaires.
        Dans ce cas, aucune information personnelle n'est collectée.
      </p>

      <p>
        Si vous souhaitez interagir avec la communauté, la création d'un compte utilisateur est nécessaire.
        Dans ce cas, une adresse e-mail, un mot de passe et un pseudo vous seront demandés, dans le seul but de vous identifier sur la plateforme.
        Aucune de ces informations n'est partagée avec un quelconque service tiers.
      </p>

      <p>
        Tous les échanges de données sont effectués de manière sécurisée (HTTPS), et les mots de passes sont chiffrés avec la fonction de hashage <code>bcrypt</code> (coût de 10).
      </p>

      <p>
        Dans une optique de transparence, nous sommes entièrement disposés à répondre à vos éventuelles questions, voire ajouter ici des précisions si nécessaire.
      </p>

      <Title id="contact">Une idée à proposer ? Un bug à signaler ?</Title>

      <p>L'équipe à l'origine de Zétécom est à l'écoute via ces différents canaux de communication :</p>

      <ul>
        {useEnvironment('CONTACT_EMAIL') && <li>Par e-mail : <Link openInNewTab href={`mailto:${useEnvironment('CONTACT_EMAIL')}`}>{useEnvironment('CONTACT_EMAIL')}</Link></li>}
        {useEnvironment('TWITTER_ACCOUNT') && <li>Sur twitter : <Link openInNewTab href={`https://twitter.com/${useEnvironment('TWITTER_ACCOUNT')}`}>twitter.com/{useEnvironment('TWITTER_ACCOUNT')}</Link></li>}
        {useEnvironment('FACEBOOK_PAGE') && <li>Sur facebook : <Link openInNewTab href={`https://facebook.com/${useEnvironment('FACEBOOK_PAGE')}`}>facebook.com/{useEnvironment('FACEBOOK_PAGE')}</Link></li>}
      </ul>

    </>
  );
};

export default FAQ;
