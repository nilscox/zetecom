/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Note from './components/Note';
import DownloadExtension from './components/DownloadExtensionButton';
import Image from './components/Image';
import Flex from 'src/components/common/Flex';
import { Link } from 'react-router-dom';
import Break from 'src/components/common/Break';
import useResponsive from './hooks/useResponsive';

/*

- Installation
  - extension chrome

- Utilisation
  - sujets
    - regrouper les réactions par thématiques portant sur l'information
    - recherche / tri
    - création
      - lien direct avec l'information
      - citation
  - lire les réactions
    - ouvrir un sujet (retour à la liste des sujets)
    - lire les réponses
      - nuancer l'information
      - mettre en perspective
      - comprendre des opinions différentes
      - mettre en évidence des biais
      - apporter des sources
      - poser des questions
    - réactions nestées
    - modération : signaler les réactions
  - quick réactions
    - favoriser le référencement pour mettre en avant les réactions les plus pertinentes ou les plus controversées
  - rédiger une réaction
    - respect de la charte : cadrer les débats, zone saine d'écoute et de partage collaboratif
    - scope (sujet, réponse)
    - édition
    - format markdown
  - inscription
    - inscription / authentification (email -> spam)
    - mot de passe oublié
    - changement de mot de passe / suppression du compte

*/

const NavigationSection: React.FC<{ section: string }> = ({ section, children }) => (
  <li style={{ paddingBottom: 15 }}>
    <div style={{ fontSize: '1.2rem', color: '#444' }}>
      <a style={{ textDecoration: 'none' }} href={`#${section.replace(' ', '_')}`}>{ section }</a>
    </div>
    { children && (
      <ul style={{ listStyleType: 'none', paddingLeft: 15, margin: 0 }}>
        { children }
      </ul>
    ) }
  </li>
);

const NavigationSubSection: React.FC<{ name: string }> = ({ name }) => (
  <li style={{ color: '#555' }}>
    <a style={{ textDecoration: 'none' }} href={`#${name.replace(/ /g, '_')}`}>{ name }</a>
  </li>
);

const Navigation: React.FC = () => (
  <nav style={{ flex: 1, order: 2, position: 'relative' }}>

    <ul style={{ position: 'sticky', top: 30, listStyleType: 'none', paddingLeft: 15, margin: 0, marginTop: 30 }}>

      <NavigationSection section="Installation" />

      <NavigationSection section="Utilisation">
        <NavigationSubSection name="Liste des sujets" />
        <NavigationSubSection name="Lire les réactions" />
        <NavigationSubSection name="Quick réactions" />
        <NavigationSubSection name="Rédiger une réaction" />
      </NavigationSection>

      <NavigationSection section="Inscription">
        <NavigationSubSection name="Inscription / Connexion" />
        <NavigationSubSection name="Mot de passe oublié" />
        <NavigationSubSection name="Suppression du compte" />
      </NavigationSection>

      <NavigationSection section="Modération">
        <NavigationSubSection name="Signaler une réaction" />
        <NavigationSubSection name="Rejoindre les modérateurs" />
      </NavigationSection>

    </ul>

  </nav>
);

const ImageSubjects: React.FC = () => {
  const { choose } = useResponsive();

  return (
    <Image
      maximize
      float="right"
      src="/assets/images/subjects.png"
      style={{
        ...choose({
          mobile: { width: '100%' },
          desktop: { width: 320 },
        }),
      }}
      containerStyle={{
        marginLeft: 30,
        marginBottom: 10,
      }}
    />
  );
};

const ImagePopup: React.FC = () => {
  const { choose } = useResponsive();

  return (
    <Image
      maximize
      float="right"
      src="/assets/images/popup-login.png"
      style={{
        ...choose({
          mobile: { width: '100%' },
          desktop: { width: 340 },
        }),
      }}
      containerStyle={{
        marginLeft: 30,
        marginBottom: 10,
      }}
    />
  );
};

const Usage: React.FC = () => (
  <div style={{ flex: 4 }}>
    <Title id="Installation">Installation</Title>

    <p>
      Pour permettre l'ajout d'une zone de commentaires sur les sites que vous visitez, il est nécessaire de passer par
      une extension sur votre navigateur, disponible pour l'instant uniquement sur le navigateur{' '}
      <a href="https://google.com/chrome" target="_blank" rel="noopener noreferrer">Google Chrome</a>. Cliquez sur le
      bouton ci-dessous pour accéder à la page de l'extension, et cliquez sur "Ajouter à Chrome".
    </p>

    <DownloadExtension>Installer l'extension chrome</DownloadExtension>

    <p>
      Une fois l'extension installée, il vous est possible de consulter les zones de commentaires intégrées sur des
      sites internet. Pour le moment, elles ne sont activées que sur certaines vidéos YouTube. Plus tard, bien d'autres
      sites d'informations seront acessibles.
    </p>

    <Title id="Utilisation">Utilisation</Title>

    <p>
      Lorsque vous visitez un site qui intègre une zone de commentaires propre à Réagir à l'information, l'icône de
      l'extension affiche un badge vert, indiquant un statut "actif" sur cette page.
    </p>

    <p>
      Vous trouverez quelque part dans la page une liste de sujets, regroupant les commentaires par thématiques. Cela
      peut être pour discuter de la validité d'un argument, pour remettre en cause l'information en apportant des
      sources, ou encore pour poser une question...
    </p>

    <SubTitle id="Liste_des_sujets">Liste des sujets</SubTitle>

    <ImageSubjects />

    <p>
      Les zones de commentaires regroupent les réactions par sujet, pour permettre de cibler un point précis à débattre.
      La liste n'affiche par défaut que le titre de chaque sujet, mais il est possible de cliquer sur ce titre pour lire
      sa description et ouvrir les réactions qui y sont rattachées.
    </p>

    <p>
      Si vous êtes <a href="#Inscription">inscrit</a>, vous pouvez ouvrir un nouveau sujet. Chaque sujet doit être
      directement rattaché à l'information, et n'être traité qu'une fois (pensez à utiliser la fonction de recherche).
      Si vous faites référence à une partie énoncée dans l'information, utilisez le champ "citation" pour la préciser.
      Et dans le cas d'une vidéo YouTube, à inclure son minutage.
    </p>

    <p>
      Pour aller plus vite, vous pouvez ouvrir les réactions d'un sujet directement en cliquant sur le nombre de
      commentaires, en haut à droite de chaque ligne dans la liste. Et après avoir ouvert un sujet, vous pouvez revenir
      à la liste via le bouton "retour".
    </p>

    <div style={{ clear: 'both' }} />

    <SubTitle id="Lire_les_réactions">Lire les réactions</SubTitle>

    <p>
      Les échanges qui se déroulent dans les espaces de commentaires sont uniquement alimentés par la communauté, et
      respectent donc la charte. Ce qui laisse la place aux échanges d'idées dans un cadre collaboratif, bienveillant et
      respectueux, mais se passera des affirmations sans preuves, des blagues et autres trolls. Les points de vue des
      membres de la communauté vont permettre de nuancer l'information ou de discuter plus en détail sur certains
      points, de manière construite et rigoureuse.
    </p>

    <p>
      Afin de suivre l'évolution des débats et garder un lien entre les messages, une réaction peut être rattachée
      directement au sujet, ou bien être rédigée en réponse à une autre. Pour faciliter la lecture, les réponses sont
      cachées par défaut. Cliquez sur le nombre de réponses pour les afficher.
    </p>

    <p>
      Si une réaction n'a pas sa place dans une zone de commentaires, il est possible de la signaler. Cela enverra une
      notification aux modérateurs, qui prendront une décision en fonction de la situation. Attention cependant à
      signaler les réactions pour de bonnes raisons ! Un message qui va à l'encontre de vos idées n'est pas un motif
      raisonnable... Voir la section <Link to="#Modération">modération</Link> de cette page pour plus d'informations.
    </p>

    <SubTitle id="Quick_réactions">Quick réactions</SubTitle>

    <p>
      Certaines réactions vont apporter des précisions, vous faire réfléchir, peut-être même vous faire changer d'avis !
      Si beaucoup d'utilisateurs trouvent un même message pertinent, il semble naturel de le mettre en avant. Pour
      donner votre avis (entièrement subjectif), sans écrire de message, vous pouvez annoter une réaction existante
      d'un "J'approuve" 👍, "Je réfute" 👎, ou bien "Je suis sceptique..." 🧐. Un algorithme va comptabiliser le nombre
      total d'annotations pour vous présenter les réactions les plus impactantes lorsque vous choisissez le tri par
      pertinence.
    </p>

    <ul>
      <li>
        👍 J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le message. Elle apporte
        des éléments qui me convainquent.
      </li>
      <li>
        👎 Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord avec le message. La
        méthode utilisée me semble incorrecte ou biaisée, ou j'ai une preuve du contraire.
      </li>
      <li>
        🧐 Je suis sceptique : je trouve que cette réaction est pertinente. Elle n'apporte pas assez d'éléments pour me
        convaincre car j'ai besoin de m'informer plus sur le sujet, ou elle évoque une problématique qui vaut la peine
        d'être discutée plus en profondeur.
      </li>
    </ul>

    <Note>
      Note : réfuter une réaction ne va pas la faire baisser dans le classement. L'algorithme prend en compte que vous
      y avez accordé de l'importance, même si vous n'êtes pas d'accord avec le message.
    </Note>

    <SubTitle id="Rédiger_une_réaction">Rédiger une réaction</SubTitle>

    <p>
      Si vous avez quelque chose à partager avec la communauté, vous pouvez rédiger une nouvelle réaction. Vous devrez
      pour cela <Link to="#Inscription">créer un compte</Link>, et donc lire et accepter <Link to="/charte">la charte de
      Réagir à l'information</Link>. Gardez bien à l'esprit les règles de la deuxième section lorsque vous écrivez un
      message.
    </p>

    <p>Deux emplacements sont possibles pour créer une nouvelle réaction :</p>

    <ul>
      <li>en réponse au sujet directement</li>
      <li>en réponse à une autre réaction</li>
    </ul>

    <p>
      Veillez à bien identifier à quoi vous répondez, et donc à rédiger la votre à l'emplacement adéquat, les réponses
      imbriquées permettant de suivre l'évolution des échanges.
    </p>

    <p>
      Personne n'est à l'abri d'une erreur ! Vous pouvez, à tout moment, modifier une réaction dont vous êtes l'auteur,
      pour en changer la formulation. Attention cependant à conserver le sens original du message, de manière à ce que
      l'échange reste cohérent. Après qu'une réaction est publiée, il n'est pas possible de l'effacer. Vous avez partagé
      votre point de vue à un moment donné, mais si votre pensée évolue ultérieurement, vous êtes invité(e) à rédiger
      une nouvelle réaction faisant part de vos découvertes...
    </p>

    <p>
      Les réactions supportent un outil de mise en page simple, permettant d'inclure des liens, du texte en gras ou en
      italique, des listes, des tableaux, etc., via un langage de balisage, le{' '}
      <a href="https://docs.microsoft.com/fr-fr/contribute/how-to-write-use-markdown">markdown</a>. Un onglet "aperçu"
      vous permet de visualiser le message tel qu'il va apparaître, avant de le poster.
    </p>

    <Title id="Inscription">Inscription</Title>

    <SubTitle id="Inscription_/_Connexion">Inscription / Connexion</SubTitle>

    <ImagePopup />

    <p>
      La création d'un compte vous permettra de devenir membre de la communauté, et de participer aux débats en
      proposant votre avis dans de nouvelles réactions, en attribuant des quick-réactions, ou encore en signalant des
      réactions inappropriées.
    </p>

    <p>
      La qualité des échanges présents sur la plateforme découlent de l'attention que les membres portent à la lecture
      de la charte. Il est donc primordial de consacrer une dizaine de minutes à sa lecture avant de vous inscrire. Très
      loin des conditions générales d'utilisations ou de textes de loi, elle énonce au contraire quelques règles,
      simples et compréhensibles, apportant aux débats un cadre d'écoute, propice aux réflexions.
    </p>

    <p>
      L'extension chrome vous permet de vous inscrire et vous connecter, via la popup qui apparait en cliquant sur
      son icône (en haut à droite de votre navigateur). Après votre inscription, vous recevrez un e-mail de bienvenue,
      vous invitant à valider votre compte en cliquant sur un lien. Pensez à vérifier dans vos spams si vous ne
      trouvez pas cet e-mail quelques minutes après votre inscription.
    </p>

    <div style={{ clear: 'both' }} />

    <SubTitle id="Mot_de_passe_oublié">Mot de passe oublié</SubTitle>

    <p>
      Il arrive d'égarer son mot de passe... Aucun problème, la popup de l'extension vous permet de demander un
      nouveau mot de passe, en cliquant sur "mot de passe oublié". Vous recevrez un email contenant un lien pour le
      changer.
    </p>

    <SubTitle id="Suppression_du_compte">Suppression du compte</SubTitle>

    <p>
      Si vous n'avez plus besoin de votre compte, vous pouvez en demander la suppression en{' '}
      <Link to="/faq#contact">contactant</Link> l'équipe qui développe le projet.
    </p>

    <Title id="Modération">Modération</Title>

    <SubTitle id="Signaler_une_réaction">Signaler une réaction</SubTitle>

    <p>
      Si vous lisez une réaction qui ne respecte pas la charte, alors vous pouvez la signaler. Il est important de
      notifier ces réactions aux modérateurs, qui pourront entreprendre des actions en fonction de la situation.
      En gardant en tête la règle 1.5 de la charte, passez votre souris sur la date de publication de la réaction à
      signaler. Cliquez sur le lien qui apparait pour ouvrir une popup vous permettant de choisir un motif de
      signalement, et de valider.
    </p>

    <Note>
      Note : vous ne pouvez signaler une réaction qu'avec un compte utilisateur. Voir la section{' '}
      <Link to="#Inscription">inscription</Link> de cette page pour en créer un si vous n'en avez pas déjà.
    </Note>

    <SubTitle id="Rejoindre_les_modérateurs">Rejoindre les modérateurs</SubTitle>

    <p>
      La modération des échanges est assurée par des membres bénévoles de la communauté. Et nous accueillons avec
      plaisir de nouveau modérateurs ! <Link to="/faq#contact">Contactez</Link> l'équipe qui développe ce projet en
      expliquant les raisons qui motivent ce choix, nous en discuterons directement.
    </p>

    <Break size="big" />

  </div>
);

const UsagePage: React.FC = () => (
  <Flex flexDirection="row">
    <Navigation />
    <Usage />
  </Flex>
);

export default UsagePage;
