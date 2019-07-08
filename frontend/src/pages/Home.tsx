/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';
import { Link } from 'react-router-dom';

import env from '../utils/env';

import SubTitle from './components/SubTitle';
import EmailValidatedAlert from './components/EmailValidatedAlert';
import Outline from './components/Outline';
import Section from './components/Section';
import Note from './components/Note';
import DownloadExtensionButton from './components/DownloadExtensionButton';
import FloatingImage, { ClearFix } from './components/FloatingImage';

/*

- Introduction :
  - pitch du projet
  - télécharger l'extension
  - Screenshot (gif commentaires YouTube / CDV)

- Contextualisation de l'information sur internet
  - disponibilité / accessibilité de l'information
  - qualité de l'information
  - désinformation, fake news, fact checking
  - manque d'organisation

- Utilisation
  - Extension chrome : affichage de commentaires externes à YouTube embed sous la vidéo
  - Lire les réactions : nuancer l'information principale, mettre en perspective, comprendre des opinions différentes
  - Quick réaction : favoriser le référencement des réactions, mettre en avant les réactions les plus pertinentes
  - Rédiger des réactions : partager des sources, des idées, soulever des problématiques, poser des quesions, réactions
    nestéés
  - Modération : signaler les réactions

- Etat d'esprit du projet
  - communauté, charte, algo de référencement
  - open source
  - projet participatif
  - vision long terme, idées futures

--

J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le message
  elle apporte des éléments me convaincant
Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord avec le message
  la méthode utilisée me semble incorrecte ou biaisée
  j'ai une preuve du contraire
Je suis septique : je trouve que cette réaction est pertinente
  elle n'apporte pas assez d'éléments pour me convaincre
  j'ai besoin de m'informer plus sur le sujet pour me faire une opinion
  elle évoque une problématique qui vaut la peine d'être discutée plus en profondeur

*/

const Home: React.FC = () => {
  return (
    <div
      id="Home"
      className="page"
    >

      <EmailValidatedAlert />

      <Outline>
        <Link to="/"><em>Chercheurs de vérité</em></Link> est une plateforme <strong>libre</strong> de réaction à
        l'information, dont le but est de proposer un <strong>espace d'échange collaboratif</strong> et bienveillant,
        mais réglementé, visant à faire <strong>avancer la connaissance</strong> via le partage des points de vue de
        chaque utilisateur.<br />
        Ici, chacun est libre d'exposer une idée, d'apporter une source, de donner son opinion ou bien de poser des
        questions, du moment que son message apporte quelque chose au débat et qu'il respecte <Link to="/charte">la
        charte</Link>. En combinant nos cerveaux intelligemment, on finira peut-être bien par s'entendre...
      </Outline>

      <Section>

        <FloatingImage src="/assets/images/youtube-cdv.gif" float="right" width={400} />

        <p>
          CDV est une plateforme qui vous permet de réagir librement à l'information. Que ce soit un article sur
          internet, dans la presse ou à la télé... Mais ça, c'est la vision à long terme. Pour le moment, il n'est
          possible de réagir qu'à certaines vidéos sur <a href="https://youtube.com">YouTube</a>, via une extension sur
          le navigateur <a href="https://google.com/chrome">Google Chrome</a>. Cette extension ajoute directement sous
          la vidéo, un bouton vous permettant de choisir d'afficher les commentaires YouTube originaux, ou bien les
          commentaires de CDV à la place. Si le système fait ses preuves sur YouTube, alors il sera peut-être
          envisageable de le déployer à plus grande échelle....
        </p>

        <DownloadExtensionButton>
          télécharger l'extension chrome
        </DownloadExtensionButton>

        <p>
          Sur internet, il règne une foultitude d'informations dont la qualité peut varier du tout au tout. Et
          particulièrement sur YouTube, on trouve aussi bien des reportages très qualitatif sur le monde, l'espace, les
          dernières découvertes scientifiques, que des vidéos relatant de fausses informations, ou incitant à croire à
          des théories complotistes. Et inévitablement, l'espace d'échanges prévu pour discuter sous la vidéo se
          retrouve facilement inondé de commentaires dont le but n'est pas de donner son opinion sur le sujet, et des
          réflexions tout à fait pertinentes se retrouvent noyées. Et c'est normal&nbsp;! La zone de commentaire YouTube
          n'est pas vraiment prévue pour ça.
        </p>

        <p>
          CDV a été imaginé dans le but de rassembler une communauté de personnes qui se mettent d'accord pour respecter
          un ensemble de règles, inspirées de principes septiques, qui donnent un cadre clair aux réflexions pouvant
          émerger en réaction aux informations sur internet. Les "réactions" (les commentaires sur CDV) peuvent être
          rédigées en réponse à d'autres, les plus impactantes étant mises en avant. Un peu comme sur reddit pour les
          connaisseurs. Prêt(e) à tenter l'expérience ? Jetez un œil à <Link to="/charte">la charte</Link> ;)
        </p>

        <ClearFix />

      </Section>

      <Section title="Utilisation">

        <SubTitle>Extension chrome</SubTitle>

        <FloatingImage width={96} float="right" src="/assets/images/extension-active.png" />

        <p>
          Le principe est simple : l'extension chrome permet d'intégrer une zone de commentaires propre à CDV
          directement à l'intérieur d'une page web sur internet. Si une page que vous visitez se retrouve modifiée pour
          ajouter un espace d'échange venant de CDV, l'icône de l'extension vous l'indique.
        </p>

        <p>
          Cette zone de réactions est uniquement alimenté par la communauté de CDV, et respecte donc la charte. Ce qui
          laisse la place aux échanges d'idées dans un cadre collaboratif, bienveillant et respectueux, mais se passera
          des affirmations sans preuves, des blagues et autres trolls. Pour participer aux conversations, il vous est
          possible de créer un compte en cliquant sur l'icône de l'extension, en haut à droite de votre navigateur.
        </p>

        <SubTitle>Intéragir avec la communauté</SubTitle>

        <p>
          Deux types d'actions sont possibles pour participer aux échanges sur CDV :
        </p>

        <ul>
          <li>Approuver ou réfuter une réaction existante</li>
          <li>Rédiger une nouvelle réaction</li>
        </ul>

        <FloatingImage src="/assets/images/quick-reactions.png" float="left" width={275} />

        <p>
          Certaines réactions vont apporter des précisions, vous faire réfléchir, peut-être même vous faire changer
          d'avis ! Si beaucoup d'utilisateurs trouvent une même réaction pertinente, il semble naturel de la mettre en
          avant. Pour cela, vous pouvez annoter une réaction existante d'un "J'approuve", "Je réfute" ou bien "Je suis
          sceptique...", pour donner votre avis, entièrement subjectif. Un algorithme va comptabiliser le nombre total
          d'annotations pour vous présenter les réactions les plus annotées lorsque vous choisissez de le tri par
          pertinence.
        </p>

        <Note>
          Note : réfuter une réaction ne va pas la faire baisser dans le classement. L'algorithme prend en compte
          que vous y avez accordé de l'importance, même si vous n'êtes pas d'accord avec le message.
        </Note>

        <p>
          Et bien sur, si vous avez quelque chose à partager avec la communauté, vous pouvez rédiger une nouvelle
          réaction. Si le sujet de votre message porte sur l'information présente dans la vidéo YouTube, ajoutez le via
          le formulaire présent tout en haut, avant les réactions. Si en revanche vous souhaitez apporter quelque chose
          par rapport à une réaction existante, utilisez le bouton "répondre". Les réponses imbriquées permettent de
          suivre le fil de la discussion et l'évolution du débat.
        </p>

        <p>
          Personne n'est à l'abri d'une erreur ! Vous pouvez, à tout moment, modifier le texte d'une réaction dont vous
          êtes l'auteur, pour en modifier la formulation. Attention cependant garder le sens original du message, de
          manière à ce que l'échange reste cohérant. Après qu'une réaction est publiée, il n'est pas possible de
          l'effacer. Vous avez partagé votre point de vue à un moment donné, mais si votre pensée évolue ultérieurement,
          vous êtes invité(e) à rédiger un nouveau message faisant part de vos découvertes...
        </p>

        <ClearFix />

      </Section>

      <Section title="Des idées sur le projet ?">

        <p>
          CDV est pensé dans un but collaboratif au niveau du contenu rédigé par les utilisateurs, mais aussi au niveau
          de son fonctionnement. Dans un but d'amélioration progressive des idées, de la charte, et de l'état d'esprit
          du projet en général, les membres de CDV sont invité à <a href="mailto:cdv@nils.cx">en discuter</a> avec
          l'équipe qui développe la plateforme. Et s'il y a des amis développeurs parmi vous, toutes les sources du
          projet sont accessibles sur <a href={env.GITHUB_REPO_URL}>github</a>. Issues and pull requests are very
          welcome :)
        </p>

        <p>
          La boîte à suggestions est ouverte ! Pour l'instant, il est par exemple envisagé d'intégrer CDV sur d'autres
          sites d'informations, de mettre en place une interface de modération par la communauté, d'améliorer
          l'algorithme de référencement... Bientôt, vous pourrez vous aussi proposer des idées d'améliorations ainsi que
          remonter d'éventuels bugs.
        </p>

        <p>
          Pour en savoir un peu plus sur les idées et valeurs qui forgent CDV, vous trouverez des informations un peu
          plus détaillées sur la page <Link to="/motivations">motivations</Link>. Restons à l'écoute, développons notre
          esprit critique, et... cherchons la vérité !
        </p>

      </Section>

    </div>
  );
};

export default Home;
